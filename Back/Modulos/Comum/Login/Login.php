<?php
	namespace Back\Modulos\Comum\Login;

	use Back\Core\Core;
	use Back\Core\CoreException;
	
	use PDO;
	use PDOException;
	
	/**
 	 * Esta classe contendo rotinas de login
 	 * Todas as requisições de login passam por aqui, são tratadas
 	 * e redirecionadas para o seu destino.
 	 *
 	 * @package    Login
 	 * @author     Alexandre Farinelli Zardo
 	*/
	final class Login {
		/**
	 	 * Armazena a coneção com o banco de dados.
	 	 *
	 	 * @access private
	 	 * @var    object
	 	*/		
		private static $Conn = array();

		/**
	 	 * Rotinas Sql do arquivo NOME DA CLASSE.sql.php.
	 	 *
	 	 * @access private
	 	 * @var    object
	 	*/		
		private static $RotSql = array();

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
		public static function Inicia(){
			include_once( 'Login.sql.php' );

			self::$RotSql[ 'GetRegLogin' ] = $GetRegLogin;
			self::$RotSql[ 'UpdtSenhLogi' ] = $UpdtSenhLogi;
			self::$RotSql[ 'RetRegLogin' ] = $RetRegLogin;

			self::$Conn = Core::Conecta();
		}

		/**
	 	 * Retorna Todos Dados Pendentes ou com erro.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetLogin( $Parametros = array() ){
			Login::Inicia();

			try {
				self::$Conn->beginTransaction();

				$Prepara = self::$Conn->prepare( self::$RotSql[ 'GetRegLogin' ] );

				$Prepara->bindValue( ':usua_cada_login', $Parametros[ 'email' ] );
				$Prepara->bindValue( ':usua_cada_senha', $Parametros[ 'senha' ] );

				$Prepara->execute();
       		
				$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );
				if ( empty( $Retorno ) == false ){
					if ( $Retorno[0]['usua_cada_troca_senha'] == 0 ){
						Core::Sessao()::Set( 'usua_cada_iden', $Retorno[0]['usua_cada_iden'] );
						Core::Sessao()::Set( 'usua_cada_nome', $Retorno[0]['usua_cada_nome'] );
						Core::Sessao()::Set( 'usua_cada_tipo', $Retorno[0]['usua_cada_tipo'] );
						Core::Sessao()::Set( 'usua_cada_login', $Retorno[0]['usua_cada_login'] );
						Core::Sessao()::Set( 'usua_cada_tenant', $Retorno[0]['usua_cada_tenant'] );
						if ( $Retorno[0]['usua_cada_tenant'] == 0 ){
							Core::Sessao()::Set( 'usua_cada_tenant', '%%' );
						};
						Core::Sessao()::Set( 'usua_cada_empre', $Retorno[0]['usua_cada_empre'] );
						if ( $Retorno[0]['usua_cada_empre'] == 0 ){
							Core::Sessao()::Set( 'usua_cada_empre', '%%' );
						};
					};

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Login',
						'status' => 'sucesso',
						'descricao' => 'Resultado do login',
						'listreg' => $Retorno,
					));
				} else{
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Login',
						'status' => 'invalido',
						'descricao' => 'Usuário Invalido',
						'listreg' => $Retorno,
					));
				};

				self::$Conn->commit();
   			} catch ( PDOException $e ) {
				throw new CoreException( $e->getMessage(), 102 );
			};
		}

		/**
	 	 * Atualiza senha no login.
		 * 
		 * @return hexa
	 	 * @access public
	 	*/
		 public static function GetAlteSenhaLogi( $Parametros = array() ){
			Login::Inicia();

			try {
				self::$Conn->beginTransaction();

				$Prepara = self::$Conn->prepare( self::$RotSql[ 'UpdtSenhLogi' ] );
				$Prepara->bindValue( ':usua_cada_senha',$Parametros[ 'senha' ] );
				$Prepara->bindValue( ':usua_cada_iden', $Parametros[ 'IdenUsua' ] );

				$Prepara->execute();
       		
				$Prepara = self::$Conn->prepare( self::$RotSql[ 'RetRegLogin' ] );
				$Prepara->bindValue( ':usua_cada_iden', $Parametros[ 'IdenUsua' ] );

				$Prepara->execute();
				
				self::$Conn->commit();

				$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );
				if ( empty( $Retorno ) == false ){
					Core::Sessao()::Set( 'usua_cada_iden', (string) $Retorno[0]['usua_cada_iden'] );
					Core::Sessao()::Set( 'usua_cada_nome', $Retorno[0]['usua_cada_nome'] );
					Core::Sessao()::Set( 'usua_cada_tipo', $Retorno[0]['usua_cada_tipo'] );
					Core::Sessao()::Set( 'usua_cada_login', $Retorno[0]['usua_cada_login'] );
					if ( $Retorno[0]['usua_cada_tenant'] == 0 ){
						Core::Sessao()::Set( 'usua_cada_tenant', '%%' );
					};
					Core::Sessao()::Set( 'usua_cada_empre', $Retorno[0]['usua_cada_empre'] );
					if ( $Retorno[0]['usua_cada_empre'] == 0 ){
						Core::Sessao()::Set( 'usua_cada_empre', '%%' );
					};

					$vCorpo = '
						<html>
							<body>
								<div>
									OLÁ '.Core::UpperCase( $Retorno[0]['usua_cada_nome'] ).'<br>
									<br>
									INFORMAMOS QUE A SENHA DE SEU USUARIO FOI ALTERADA NO SISTEMAS <br>
									<br>
									CASO NÃO TENHA NÃO RECONHEÇA ESSA ALTERAÇÃO<br>
									<br>
									ENTRE EM CONTATO COM O ADMINISTRADOR PARA SOLICITAR O BLOQUEIO DA CONTA<br>
									<br><br><br>
									EM CASO DE DUVIDA ENTRAR EM CONTATO COM O SUPORTE TÉCNICO<br><br><br>
									<br>
									POR FAVRO NÃO RESPONDER A ESSE E-MAIL POIS O MESMO NÃO SERÁ LIDO<br>
									<br>
								</div>
							</body>
						</html>
					';

					$vDestinatario[0] = array( 
						'email' => $Retorno[0]['usua_cada_login'], 
						'nome' => $Retorno[0]['usua_cada_nome'],
					);

					$vEmail = Core::EnivEmai(
						$Retorno[0]['usua_cada_tenant'],
						$Retorno[0]['usua_cada_empre'],
						$vDestinatario, 
						'SENHA ALTERADA SISTEMA '.Core::config( 'system_name' ).' - ENVIADO EM '.date ( 'd/m/Y' ),
						$vCorpo,
						''
					);

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Login',
						'status' => 'sucesso',
						'descricao' => 'Resultado do login',
						'listreg' => $Retorno,
					));
				} else{
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Login',
						'status' => 'invalido',
						'descricao' => 'Usuário Invalido',
						'listreg' => $Retorno,
					));
				};
   			} catch ( PDOException $e ) {
				throw new CoreException( $e->getMessage(), 102 );
			};
		}
	}
?>