<?php
	namespace Back\Core;

	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\SMTP;
	use PHPMailer\PHPMailer\Exception;
	
	use Back\Core\Sessao;
	use Back\Core\CoreException;
	use Back\Core\Relatorio;
	
	use Back\Modulos\Comum\Usuarios\Usuarios;

	use PDO;
	use PDOException;
	use ReflectionClass;

	use TCPDFBarcode;

	/**
 	* Esta classe é a mais importante da API.
 	* Todas as requisições passam por aqui, são tratadas
 	* e redirecionadas para o seu destino.
 	*
 	* @package    Core
 	* @author     Alexandre Farinelli Zardo
 	*/
	final class Core {
		/**
	 	 * Armazena as configurações da aplicação.
	 	 *
	 	 * @access private
	 	 * @var    string
	 	*/		
		public static $config = array();
				
		/**
	 	 * Método implementado para manipular dados
	 	 * das sessoes no php
		 * 
	 	 * 
	 	 * @return class
	 	 * @access public
	 	*/
		public static function Sessao (){
			return new Sessao;
		}

		/**
	 	 * Método implementado para manipular dados
	 	 * das sessoes no php
		 * 
	 	 * 
	 	 * @return class
	 	 * @access public
	 	*/
		 public static function Usuarios (){
			return new Usuarios;
		}

		/**
	 	 * Método implementado para manipular os erros
	 	 * ocorridos no PHP ou pegos em exceções
		 * 
	 	 * 
	 	 * @param  $exception - o tipo de erro
	 	 * @param  $message   - a mensagem de erro
	 	 * @param  $file      - o arquivo onde ocorreu o erro 
	 	 * @param  $line      - a linha onde ocorreu o erro
	 	 * @return mixed
	 	 * @access public
	 	*/
		public static function error_handler( $exception, $message = false, $file = false, $line = false ){
			// verifica qual o tipo de erro que ocorreu
			if ( $exception instanceof Exception ) {
				$code = $exception->getCode();
				if ( self::config ( $code ) == true ) {
					$type = self::config ( $code );
				
				} else {
					$type = 'Erro API';
				
				};
			
				// pega os atributos dos erros da exceção
				$message  = $exception->getMessage();
				$file     = $exception->getFile();
				$line     = $exception->getLine();
				$trace    = $exception->getTrace();
			} else {
				$type  	  = 'PHP Error';
				$message  = $exception->getMessage();
				$file     = $exception->getFile();
				$line     = $exception->getLine();
				$code     = $exception;
				$trace    = debug_backtrace();
			}
		
			// exibe o nome do arquivo de forma mais legível
			$file = preg_replace('|^'.preg_quote( pathinfo(__FILE__)['dirname'] ).'|', '', $file);
			$file = str_replace( '\\', '/', $file );

			echo json_encode( array (
				'message' => $message,
				'file' => $file,
				'line' => $line,
				'type' => $type,
				'code' => $code,
				'trace' => $trace,
			) );
		}		
		
		/**
	 	 * Conecta banco de dados.
	 	 *
		 * @param Dsn Dsn da coneção usada dependendo do banco de dados
		 * @param Usuario do banco de dados
		 * @param Senha do banco de dados
		 * @param Classe nome da classe para carega o sql
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function Conecta(){
			$Dsn = Core::config( 'drive' ).Core::config( 'servidor' ).Core::config( 'banco' ).Core::config( 'charsetbanco' );
			$Usuario = Core::config( 'usuario' );
			$Senha = Core::config( 'senha' );

			if ( ( $Dsn != '' ) && ( $Usuario != '' ) ) {
				try {
					$Conn = new PDO( $Dsn, $Usuario, $Senha);
					$Conn->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
			
					return $Conn;
				} catch ( PDOException $e ) {
					throw new CoreException( $e->getMessage(), 102 );
				};
			} else {
				$Parametros = '';
				if ( $Dsn == '' ){
					$Parametros = 'DSN';
				};

				if ( $Usuario == '' ){
					if ( $Parametros != '' ){
						$Parametros = $Parametros.', ';
					};
					$Parametros = $Parametros.'USUARIO';
				};

				throw new CoreException( 'Paramentros de Coneção Faltando '.$Parametros , 102 );
			};
		}
		
		/**
	 	 * Método implementado para carregar o
	 	 * arquivo de configuração.
	 	 * 
	 	 * @param  $key - a configuração desejada
	 	 * @return mixed
	 	 * @access public
	 	*/
		public static function config( $key ){
			// verifica se o arquivo já foi carregado
			if ( isset( self::$config[$key] ) ){
				return self::$config[$key];
			};

			// verifica se o arquivo de configuração existe
			if ( !file_exists( 'Back/Core/Config.php' ) ){
				throw new CoreException( ' O arquivo Config.php não existe.', 100 );
			} else {
				include_once( 'Back/Core/Config.php' );
			};

			// atribui o array do arquivo para o array statico da classe
			self::$config = $config;

			if ( !isset( self::$config[$key] ) ) {
				throw new CoreException( 'Chave de configuração('.$key.') não existe no arquivo Config.php.', 100 );
			};				

			return self::$config[$key];
		}
		
		/**
	 	 * Parametrametriza a aplicação.
	 	 *
		 * @return void
	 	 * @access public
	 	*/
		public static function setup(){
			ini_set( 'max_execution_time', 300 );
			ini_set( 'memory_limit','2024M' );

			/**
    		 * Define o nível de erros que serão reportados. Utilizamos como padrão o recomendado pelo
     		 * PHP, se quiser alterar consulte a documentação antes. Recomendamos que deixe como está.
     		 *
     		 * @see http://br.php.net/manual/pt_BR/function.error-reporting.php
    		*/
    		error_reporting(E_ALL | E_STRICT);

			// define método que gerenciará os erros
			//set_error_handler( array('Core', 'error_handler') );

			// define método que gerenciará exceções
			//set_exception_handler( array( 'Core', 'error_handler' ) );
			
			// toda saída text/html será do charset especificado
			header( 'Content-Type: text/html; charset='.self::config ( 'charset' ) );
			 
			// define timezone para função date
			date_default_timezone_set( self::config( 'time_zone' ) );
		}

		/**
	 	 * Método implementado para Direcionar a Aplicação
	 	 * 
		 * @param  $_Rota - camiho desejado
	 	 * @return mixed
	 	 * @access public
	 	*/
		public static function Rota( $_Rota ){
			self::setup();
			if ( isset( $_POST['evento'] ) ){
				$Dados = $_POST['evento'];			
				
				$_Rota = explode( '/', $_Rota );

				if ( count( $_Rota ) > 0 ){

  					$NameSpace = 'Back\Modulos';

					$NameSpacePasta = mb_convert_case( $_Rota[ count( $_Rota ) - 3 ], MB_CASE_TITLE, 'UTF-8' ).'\\';
					$Pasta = mb_convert_case( $_Rota[ count( $_Rota ) - 3 ], MB_CASE_TITLE, 'UTF-8' ).'/';
					
					$NameSpacePasta = mb_convert_case( $_Rota[ count( $_Rota ) - 4 ], MB_CASE_TITLE, 'UTF-8' ).'\\'.$NameSpacePasta;
					$Pasta = mb_convert_case( $_Rota[ count( $_Rota ) - 4 ], MB_CASE_TITLE, 'UTF-8' ).'/'.$Pasta;

					$Arquivo = mb_convert_case( $_Rota[ count( $_Rota ) - 3 ], MB_CASE_TITLE, 'UTF-8' ).'.php';
					$Modulo = 'Modulos/';
					$Dir = str_replace( array( 'Core' ), '', __DIR__ );
					
					if ( $Arquivo == 'Sessao.php' ){
						$NameSpace = 'Back\Core';

						$NameSpacePasta = '';

						$Modulo = '';
						$Pasta = 'Core/';
						$Dir = 'Back/';
					};

					//echo $Dir.$Modulo.$Pasta.$Arquivo;

					if ( file_exists( $Dir.$Modulo.$Pasta.$Arquivo ) ) {
						
						$Classe = $NameSpace.'\\'.$NameSpacePasta.$_Rota[ count( $_Rota ) - 3 ];
				
						$Metodo = $_Rota[ count( $_Rota ) - 2 ];
						
						if ( method_exists ( new $Classe, $Metodo ) ){

							$Classe = new ReflectionClass( $Classe );							
							$Metodo = $Classe->getMethod( $Metodo );
							$Classe = $Classe->newInstance();

							$Resultado = $Metodo->invokeArgs( $Classe, array( $Dados ) );
								
							return $Resultado;

						} else {
							throw new CoreException( 'Metodo não encontrado: '. $Metodo.' da Classe: '.$Classe, 102 );
						};
					} else {
						throw new CoreException( 'Arquivo não encontrado: '.$Arquivo. ' - '.$Pasta, 102 );
					};
				} else {
					throw new CoreException( 'Parâmetros incorretos. Acesso negado', 101 );
				};
			} else  {
				throw new CoreException( 'Parâmetros incorretos. Acesso negado'. isset( $_POST['post'] ), 101 );
			};
		}

		/**
	 	 * Método implementado para Centraizar a 
		 * converção para maiusculo
	 	 * 
		 * @param  $vStr - string para converter
	 	 * @return sring
	 	 * @access public
	 	*/
		public static function UpperCase( $vStr ){
			return mb_convert_case( $vStr, MB_CASE_UPPER, Core::config( 'charset' ) );
		}

		/**
	 	 * Método implementado para Centraizar a 
		 * converção para minusculo
	 	 * 
		 * @param  $vStr - string para converter
	 	 * @return sring
	 	 * @access public
	 	*/
		public static function LowerCase( $vStr ){
			return mb_convert_case( $vStr, MB_CASE_LOWER, Core::config( 'charset' ) );
		}

		/**
	 	 * Envio de email
		 *
		 * @param  $vTenant - código inquilino
		 * @param  $vEmpresa - código empresa
		 * @param  $vDestinatario - array[] ( Nome, Email )
		 * @param  $vAssunto - Assunto e-mail
		 * @param  $vCorpo - Corpo
		 * @param  $Anexos - array( anexo1, Anexo2 ) 
		 * 
	 	 * @return sring
	 	 * @access public
	 	*/
		public static function EnivEmai( $vTenant, $vEmpresa, $vDestinatario, $vAssunto, $vCorpo, $Anexos){
			$vEmai = new PHPMailer( true );

			try {
				$Conn = Core::Conecta();

				$Conn->beginTransaction();

				$Prepara = $Conn->prepare('
					SELECT
						sist_para_iden,
						sist_para_smtp,
						sist_para_porta,
						sist_para_secu,
						sist_para_auth,
						sist_para_user,
						sis_para_pwd,
						sis_para_from,
						sis_para_from_name
					FROM
						sist_para
					WHERE
						sist_para_tenant = :sist_para_tenant AND
						sist_para_empre = :sist_para_empre
				');

				$Prepara->bindValue( ':sist_para_tenant', $vTenant );
				$Prepara->bindValue( ':sist_para_empre', $vEmpresa );
				
				$Prepara->execute();
       		
				$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );
				
				$Conn->commit();

				//Enable SMTP debugging
				//SMTP::DEBUG_OFF = off (for production use)
				//SMTP::DEBUG_CLIENT = client messages
				//SMTP::DEBUG_SERVER = client and server messages
				$vEmai->SMTPDebug = SMTP::DEBUG_OFF;

				if ( !isset( $vDestinatario ) ) {
					throw new CoreException( 'Especifique um Destinatário', 100 );
				};

				foreach ( $vDestinatario as $Linha => $Valor ) {
                    //Define os destinatário(s)
					$vEmai->AddAddress( $Valor[ 'email' ], $Valor[ 'nome' ] );
					//Define a resposta
					$vEmai->AddReplyTo( $Valor[ 'email' ], $Valor[ 'nome' ] );
                };				

				$vEmai->SetLanguage( 'br', 'lang/' );

				//Define os dados do servidor e tipo de conexão
				$vEmai->IsSMTP(); // Define que a mensagem será SMTP
				$vEmai->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

				$vEmai->Host = $Retorno[0][ 'sist_para_smtp' ]; // Endereço do servidor SMTP
				$vEmai->Port = $Retorno[0][ 'sist_para_porta' ];
				$vEmai->SMTPAuth = $Retorno[0][ 'sist_para_auth' ];  // Usa autenticação SMTP? (opcional)
				$vEmai->Username = $Retorno[0][ 'sist_para_user' ]; // Usuário do servidor SMTP
				$vEmai->Password = $Retorno[0][ 'sis_para_pwd' ]; // Senha do servidor SMTP

				//Define os dados técnicos da Mensagem
				$vEmai->IsHTML( true ); // Define que o e-mail será enviado como HTML
				$vEmai->CharSet = 'utf-8'; // Charset da mensagem (opcional)

				//Define o remetente
				$vEmai->From =  $Retorno[0][ 'sis_para_from' ];
				$vEmai->FromName =  $Retorno[0][ 'sis_para_from_name' ];

				//Define a mensagem (Texto e Assunto)
				$vEmai->Subject = $vAssunto;
				$vEmai->msgHTML( $vCorpo );

				// Envia o e-mail
				$vEmai->Send();
				
				return array(
					'sistema' => self::config( 'system_apelido' ),
					'modulo' => 'Mensagens',
					'status' => 'sucesso',
					'descricao' => 'E-mail envido com sucesso',
					'listreg' => null,
				);
			} catch (Exception $e) {
				return array(
					'sistema' => self::config( 'system_apelido' ),
					'modulo' => 'Mensagens',
					'status' => 'falha',
					'descricao' => 'E-mail não enviado',
					'listreg' => $e->getMessage(),
				);
			};
		}

		/**
	 	 * Formata Data MARIA DB
		 *
		 * @param  $vData - Formato Brasil
		 * 
	 	 * @return sring
	 	 * @access public
	 	*/
		public static function GetDataMariaDb( $vData ){
			$vData = explode( '/', $vData );
			return $vData[2].'-'.$vData[1].'-'.$vData[0];
		}
		
		/**
	 	 * Gera PDF
		 *
		 * @param  $Orientacao
		 * 
	 	 * @return Arquivo PDF
	 	 * @access public
	 	*/
		public static function SetGeraPdf( $vCabecalho, $vHtml, $vImagLogo, $vOrientacao = 'P', $vTipo, $vMargem = array( 10, 10, 10 ) ){
			
			$RelaPdf = new Relatorio( $vOrientacao, 'mm', 'A4', true, 'UTF-8', false );
			$RelaPdf->SetHeaderMargin( 10 );
			$RelaPdf->setImageScale( PDF_IMAGE_SCALE_RATIO );
			$RelaPdf->SetAutoPageBreak( true, PDF_MARGIN_BOTTOM );
			$RelaPdf->CabeHtml = $vCabecalho;
			$RelaPdf->CabeLogo = $vImagLogo;

			if ( $vTipo == 'COLUNAS' ) {
				$RelaPdf->SetMargins( $vMargem[0], $vMargem[1], $vMargem[2] );
				$RelaPdf->resetColumns();
				$RelaPdf->setEqualColumns( 2, 95 );
				$RelaPdf->selectColumn();
				$RelaPdf->AddPage();
			} else if ( $vTipo == 'SIMPLES' ) {
				$RelaPdf->SetMargins( $vMargem[0], $vMargem[1], $vMargem[2] );
				$RelaPdf->AddPage();
			};

			$ArqvPdf = rand().'.pdf';
			
			$RelaPdf->writeHTML( $vHtml, true, false, true, false, '');
			$RelaPdf->lastPage();
			$RelaPdf->Output( str_replace( array( 'Back\Core', 'Back/Core' ), '', __DIR__ ).'Arquivos/'.$ArqvPdf, 'F' );

			return '../../Arquivos/'.$ArqvPdf;
		}
		
		/**
	 	 * Gera código de barras PDF
		 *
		 * @param  $vCodigo - dados código de barra
		 * @param  $vTipoBarr - C39 : CODE 39 - ANSI MH10.8M-1983 - USD-3 - 3 of 9.
   		 *						C39+ : CODE 39 with checksum
    	 *						C39E : CODE 39 EXTENDED
    	 *						C39E+ : CODE 39 EXTENDED + CHECKSUM
    	 *						C93 : CODE 93 - USS-93
    	 *						S25 : Standard 2 of 5
    	 *						S25+ : Standard 2 of 5 + CHECKSUM
    	 *						I25 : Interleaved 2 of 5
    	 *						I25+ : Interleaved 2 of 5 + CHECKSUM
    	 *						C128 : CODE 128
    	 *						C128A : CODE 128 A
    	 *						C128B : CODE 128 B
    	 *						C128C : CODE 128 C
    	 *						EAN2 : 2-Digits UPC-Based Extension
    	 *						EAN5 : 5-Digits UPC-Based Extension
    	 *						EAN8 : EAN 8
    	 *						EAN13 : EAN 13
    	 *						UPCA : UPC-A
    	 *						UPCE : UPC-E
    	 *						MSI : MSI (Variation of Plessey code)
    	 *						MSI+ : MSI + CHECKSUM (modulo 11)
    	 *						POSTNET : POSTNET
    	 *						PLANET : PLANET
    	 *						RMS4CC : RMS4CC (Royal Mail 4-state Customer Code) - CBC (Customer Bar Code)
    	 *						KIX : KIX (Klant index - Customer index)
    	 *						IMB: Intelligent Mail Barcode - Onecode - USPS-B-3200
    	 *						CODABAR : CODABAR
    	 *						CODE11 : CODE 11
    	 *						PHARMA : PHARMACODE
    	 *						PHARMA2T : PHARMACODE TWO-TRACKS
		 * @param  $vLargura
		 * @param  $vAltura
		 * 
	 	 * @return base64 código de barras
	 	 * @access public
	 	*/
		public static function SetCodBarrPDF ( $vCodigo, $vTipoBarr, $vLargura, $vAltura ) {
			$CodBarrPDF = new TCPDFBarcode( $vCodigo, $vTipoBarr );
			return base64_encode( $CodBarrPDF->getBarcodePngData( $vLargura, $vAltura ) );
		}

		/**
	 	 * Exclui arquivo
		 *
		 * @param  $vArquivo Caminho do Arquivo e ser Excluido
		 * 
	 	 * @return Arquivo PDF
	 	 * @access public
	 	*/
		public static function GetExclArqu( $vArquivo ){
			sleep( 15 );
			if( file_exists( str_replace( array( 'Back\Core', 'Back/Core' ), '', __DIR__ ).str_replace( array( '../..', '' ), '', $vArquivo ) ) ){
				return unlink( str_replace( array( 'Back\Core', 'Back/Core' ), '', __DIR__).str_replace( array( '../..', '' ), '', $vArquivo ) );
			};
			return false;
		}
	};
?>