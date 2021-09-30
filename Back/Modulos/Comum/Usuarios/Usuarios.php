<?php
	namespace Back\Modulos\Comum\Usuarios;
	
	use Back\Core\Core;

	use Back\Modulos\Comum\Tenant\Tenant;

	use PDO;
	use PDOException;

	/**
 	 * Esta classe contendo rotinas de Usuários
 	 * Todas as requisições de Usuários passam por aqui, são tratadas
 	 * e redirecionadas para o seu destino.
 	 *
 	 * @package    Usuarios
 	 * @author     Alexandre Farinelli Zardo
 	*/
	final class Usuarios {
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
	 	 * Inicia modulo de usuarios
	 	 *
		 * @return mixed
	 	 * @access public
	 	*/
		public static function Inicia(){
			include( 'Usuarios.sql.php' );

			self::$RotSql[ 'GetRegUsua' ] = $GetRegUsua;
			
			self::$RotSql[ 'DuplRegUsua' ] = $DuplRegUsua;
			self::$RotSql[ 'InstRegUsua' ] = $InstRegUsua;
			self::$RotSql[ 'UpdtRegUsua' ] = $UpdtRegUsua;
			self::$RotSql[ 'UpdtSenhUsua' ] = $UpdtSenhUsua;
			self::$RotSql[ 'DeleRegUsua' ] = $DeleRegUsua;
			
			self::$RotSql[ 'GetRegPermUsua' ] = $GetRegPermUsua;
			self::$RotSql[ 'ChkRegPermUsua' ] = $ChkRegPermUsua;
			self::$RotSql[ 'InstPermUsua' ] = $InstPermUsua;
			self::$RotSql[ 'UpdtPermUsua' ] = $UpdtPermUsua;

			self::$RotSql[ 'SelValiPermUsua' ] = $SelValiPermUsua;

			self::$RotSql[ 'GetTercRegUsua' ] = $GetTercRegUsua;

 			self::$Conn = Core::Conecta();
		}

		/**
	 	 * Retorna Todos Dados dos usuários.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetUsua( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Usuarios::Inicia();

				try {
					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'GetRegUsua' ] );

					$Prepara->bindValue( ':usua_cada_nome_login', $Parametros[ 'usua_cada_nome_login' ] );
					$Prepara->bindValue( ':usua_cada_tenant', Core::Sessao()::Get( 'usua_cada_tenant' ) );
					$Prepara->bindValue( ':usua_cada_empre', Core::Sessao()::Get( 'usua_cada_empre' ) );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					$Retorno = array_map( function( $input ) {
						$Botao = '';
						if ( isset( $input['usua_cada_boto'] ) == false){
							$Botao = '
								<button id="EditBtnUsua" type="button" class="btn btn-secondary" title="ALTERAR"><i class="fas fa-user-edit"></i></button>
								<button id="DeleBtnUsua" type="button" class="btn btn-danger" title="EXCLUIR"><i class="fas fa-user-minus"></i></button>
								<button id="ReseBtnUsua" type="button" class="btn btn-success" title="RESETAR SENHA"><i class="fas fa-key"></i></button>
							';
						};
						
						return array(
							'usua_cada_boto' => $Botao,
							'usua_cada_iden' => $input['usua_cada_iden'],
							'usua_cada_nome' => $input['usua_cada_nome'],
							'usua_cada_tipo' => $input['usua_cada_tipo'],
							'usua_cada_login' => $input['usua_cada_login'],
							'usua_cada_status' => $input['usua_cada_status'],
							'usua_cada_tenant' => $input['usua_cada_tenant'],
							'usua_cada_empre' => $input['usua_cada_empre'],
							'usua_cada_adm' => $input['usua_cada_adm'],
						);
					}, $Retorno );       

					self::$Conn->commit();
					
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Usuarios',
						'status' => 'sucesso',
						'descricao' => 'Resultado Pesquisa Usuario',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Usuarios',
						'status' => 'invalido',
						'descricao' => 'Pesquisa Usuários com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}
		
		/**
	 	 * Gera senha aleatória para usuario
		 * 
		 * @return array
	 	 * @access public
	 	*/
		public static function SetSenhaUsua( $vIdenUsua, $vEmail, $vNome, $vAssunto, $vCorpo ){
			$vDestinatario = array();

			$NewSenh = random_bytes( 6 );
			$NewSenh = bin2hex( $NewSenh );
			
			self::$Conn->beginTransaction();

			$DublSele = self::$Conn->prepare( self::$RotSql[ 'UpdtSenhUsua' ] );
			$DublSele->bindValue( ':usua_cada_senha', md5( $NewSenh ) );
			$DublSele->bindValue( ':usua_cada_iden', $vIdenUsua );
			
			$DublSele->execute();
			
			self::$Conn->commit();

			$vCorpo = str_replace( '@Senha', $NewSenh, $vCorpo );

			$vDestinatario[0] = array( 
				'email' => $vEmail, 
				'nome' => $vNome
			);

			return Core::EnivEmai(
				Core::Sessao()::Get( 'usua_cada_tenant' ),
				Core::Sessao()::Get( 'usua_cada_empre' ),
				$vDestinatario, 
				$vAssunto, $vCorpo, ''
			);
		}
		
		/**
		 * Salava usuario quando for inclusão ou alteração.
		 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return integer Ultimo id usuario
		 * @access public
		*/
		public static function SetSalvUsua( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 12,
				);

				$PermiInclu = Usuarios::GetValiPermUsua( $ParamVali );
				
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 13,
				);
				
				$PermiAlter = Usuarios::GetValiPermUsua( $ParamVali );
				
				if ( ( $PermiInclu[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenUsua' ] == 'Automatico' ) ){
					return json_encode( $PermiInclu	);
				};
				
				if ( ( $PermiAlter[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenUsua' ] != 'Automatico' ) ){
					return json_encode( $PermiAlter	);
				};

				Usuarios::Inicia();

				try {
					$status = 'duplicado';
					$descricao = 'Inclusão de Usuário Login Duplicado';
					$listreg = 'Registro login '.Core::LowerCase( $Parametros[ 'LogiUsua' ] ).' duplicado';

					if ( $Parametros[ 'IdenUsua' ] == 'Automatico' ){
						$Parametros[ 'IdenUsua' ] = 0;
					};

					self::$Conn->beginTransaction();

					$DublSele = self::$Conn->prepare( self::$RotSql[ 'DuplRegUsua' ] );
					$DublSele->bindValue( ':usua_cada_nome_login', Core::LowerCase( $Parametros[ 'LogiUsua' ] ) );
					$DublSele->bindValue( ':usua_cada_iden', $Parametros[ 'IdenUsua' ] );
					$DublSele->execute();
					
					$DublReto = $DublSele->fetchAll( PDO::FETCH_ASSOC );
					if( $DublReto[0][ 'usua_cada_iden' ] == 0 ){
						if ( $Parametros[ 'IdenUsua' ] == 0 ){
							$descricao = 'Inclusão de Usuários';
							$Prepara = self::$Conn->prepare( self::$RotSql[ 'InstRegUsua' ] );
						} else {
							$descricao = 'Alteração de Usuários';
							$Prepara = self::$Conn->prepare( self::$RotSql[ 'UpdtRegUsua' ] );
							$Prepara->bindValue( ':usua_cada_iden', $Parametros[ 'IdenUsua' ] );
						};
						
						$Prepara->bindValue( ':usua_cada_nome', Core::UpperCase( $Parametros[ 'NomeUsua' ] ) );
						$Prepara->bindValue( ':usua_cada_tipo', Core::UpperCase( $Parametros[ 'TipoUsua' ] ) );
						$Prepara->bindValue( ':usua_cada_login', Core::LowerCase( $Parametros[ 'LogiUsua' ] ) );
						$Prepara->bindValue( ':usua_cada_status', $Parametros[ 'StatUsua' ] );
						$Prepara->bindValue( ':usua_cada_tenant', $Parametros[ 'TenanUsua' ] );
						$Prepara->bindValue( ':usua_cada_empre', $Parametros[ 'EmprUsua' ] );

						$Prepara->execute();
					
						if ( $descricao == 'Inclusão de Usuários' ){
							$Retorno = self::$Conn->lastInsertId().' incluido';
							$Parametros[ 'IdenUsua' ] = self::$Conn->lastInsertId();
						} else {
							$Retorno = $Parametros[ 'IdenUsua' ].' alterado';
						};

						$PermUsua = json_decode( $Parametros[ 'PermUsua' ], true );
						foreach ( $PermUsua as $Lin => $Val ){
							if ( $Val[ 'usua_aces_cada_opca_stat' ] == false ) {
								$Val[ 'usua_aces_cada_opca_stat' ] = 0;
							} else {
								$Val[ 'usua_aces_cada_opca_stat' ] = 1 ;
							};
							
							$ChkPermUsua = self::$Conn->prepare( self::$RotSql[ 'ChkRegPermUsua' ] );

							$ChkPermUsua->bindValue( ':usua_aces_cada_usua_iden', $Parametros[ 'IdenUsua' ] );
							$ChkPermUsua->bindValue( ':usua_aces_cada_opca_iden', $Val[ 'usua_aces_cada_opca_iden' ] );

							$ChkPermUsua->execute();
				
							$RetoPermUsua = $ChkPermUsua->fetchAll( PDO::FETCH_ASSOC );

							if( $RetoPermUsua[0][ 'usua_aces_cada_iden' ] == 0 ){
								$PrepPermUsua = self::$Conn->prepare( self::$RotSql[ 'InstPermUsua' ] );
							} else {
								$PrepPermUsua = self::$Conn->prepare( self::$RotSql[ 'UpdtPermUsua' ] );
							};
							
							$PrepPermUsua->bindValue( ':usua_aces_cada_usua_iden', $Parametros[ 'IdenUsua' ] );
							$PrepPermUsua->bindValue( ':usua_aces_cada_opca_iden', $Val[ 'usua_aces_cada_opca_iden' ] );
							$PrepPermUsua->bindValue( ':usua_aces_cada_opca_stat', $Val[ 'usua_aces_cada_opca_stat' ] );

							$PrepPermUsua->execute();
						};
						
						self::$Conn->commit();
						
						$status = 'sucesso';
						$listreg = 'Registro ID '.$Retorno;

						if ( $descricao == 'Inclusão de Usuários' ){
							$vCorpo = '
								<html>
									<body>
										<div>
											OLÁ '.Core::UpperCase( $Parametros[ 'NomeUsua' ] ).'<br>
											<br>
											INFORMAMOS QUE SEU USUARIO FOI INCLUIDO NO SISTEMAS <br>
											<br>
											APOS O ACESSO VOCÊ SERÁ DIRECIONADO PARA ALTERAR A SENHA<br><br><br>
											<br><br><br>
											CLIQUE NO LINK ABAIXO E UTILIZE OS DADOS DE LOGIN E SENHA PARA ACESSAR<br>
											'.str_replace('/Front/Menu/menu.html', '', $_SERVER[ 'HTTP_REFERER' ] ).'/index.html<br><br><br>
											<br>
											LOGIN: '.Core::LowerCase( $Parametros[ 'LogiUsua' ] ).'<br>
											<br>
											SENHA: @Senha<br><br><br>
											<br>
											EM CASO DE DUVIDA ENTRAR EM CONTATO COM O SUPORTE TÉCNICO<br><br><br>
											<br>
											POR FAVRO NÃO RESPONDER A ESSE E-MAIL POIS O MESMO NÃO SERÁ LIDO<br>
											<br>
										</div>
									</body>
								</html>
							';

							$vEmail = self::SetSenhaUsua(
								$Retorno,
								Core::LowerCase( $Parametros[ 'LogiUsua' ] ),
								Core::UpperCase( $Parametros[ 'NomeUsua' ] ), 
								'BEM VINDO AO SISTEMA '.Core::config( 'system_name' ).' - ENVIADO EM '.date ( 'd/m/Y' ),
								$vCorpo
							);

							if ( $vEmail[ 'status' ] == 'falha' ){
								$listreg = $listreg.'</br></br>'.
								'E-mail: '.$vEmail[ 'descricao' ].'</br>'.
								'Detalhes: '.$vEmail[ 'listreg' ];
							} else {
								$listreg = $listreg.'</br>'.
								'E-mail: '.$vEmail[ 'descricao' ];
							};
						};
					};

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Usuarios',
						'status' => $status,
						'descricao' => $descricao,
						'listreg' => $listreg,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Usuarios',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Usuários com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
		 * Exclui usuario.
		 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return integer Ultimo id usuario
		 * @access public
		*/
		public static function SetDeleUsua( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {		
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 14,
				);
				
				$PermiDele = Usuarios::GetValiPermUsua( $ParamVali );
				if ( $PermiDele[ 'status' ] == 'restrito' ){
					return json_encode( $PermiDele	);
				};
				
				Usuarios::Inicia();

				try {
					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'DeleRegUsua' ] );
					$Prepara->bindValue( ':usua_cada_iden', $Parametros[ 'IdenUsua' ] );

					$Prepara->execute();
					
					$Retorno = $Parametros[ 'IdenUsua' ].' excluido';
						
					self::$Conn->commit();

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Usuarios',
						'status' => 'sucesso',
						'descricao' => 'Exclusão de Usuários',
						'listreg' => 'Registro ID '.$Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Usuarios',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Usuários com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
		 * Reseta senha usuario.
		 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return integer Ultimo id usuario
		 * @access public
		*/
		public static function SetReseSenhUsua( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Usuarios::Inicia();

				$vCorpo = '
					<html>
						<body>
							<div>
								OLÁ '.Core::UpperCase( $Parametros[ 'NomeUsua' ] ).'<br>
								<br>
								INFORMAMOS QUE A SENHA DE SEU USUARIO FOI RESETADA NO SISTEMAS <br>
								<br>
								APOS O ACESSO VOCÊ SERÁ DIRECIONADO PARA ALTERAR A SENHA<br><br><br>
								<br><br><br>
								CLIQUE NO LINK ABAIXO E UTILIZE OS DADOS DE LOGIN E SENHA PARA ACESSAR<br>
								'.str_replace('/Front/Menu/menu.html', '', $_SERVER[ 'HTTP_REFERER' ] ).'/index.html<br><br><br>
								<br>
								LOGIN: '.Core::LowerCase( $Parametros[ 'LogiUsua' ] ).'<br>
								<br>
								SENHA: @Senha<br><br><br>
								<br>
								EM CASO DE DUVIDA ENTRAR EM CONTATO COM O SUPORTE TÉCNICO<br><br><br>
								<br>
								POR FAVRO NÃO RESPONDER A ESSE E-MAIL POIS O MESMO NÃO SERÁ LIDO<br>
								<br>
							</div>
						</body>
					</html>
				';

				$status = 'sucesso';
				$listreg = 'Registro ID '.$Parametros[ 'IdenUsua' ].' Senha Resetada';

				$vEmail = self::SetSenhaUsua(
					$Parametros[ 'IdenUsua' ],
					Core::LowerCase( $Parametros[ 'LogiUsua' ] ),
					Core::UpperCase( $Parametros[ 'NomeUsua' ] ), 
					'SENHA RESETADA SISTEMA '.Core::config( 'system_name' ).' - ENVIADO EM '.date ( 'd/m/Y' ),
					$vCorpo
				);

				if ( $vEmail[ 'status' ] == 'falha' ){
					$listreg = $listreg.'</br></br>'.
					'E-mail: '.$vEmail[ 'descricao' ].'</br>'.
					'Detalhes: '.$vEmail[ 'listreg' ];
				} else {
					$listreg = $listreg.'</br>'.
					'E-mail: '.$vEmail[ 'descricao' ];
				};
				
				return json_encode( array(
					'sistema' => Core::config( 'system_apelido' ),
					'modulo' => 'Usuarios',
					'status' => $status,
					'descricao' => 'Resete Senha de Usuários',
					'listreg' => $listreg,
				));
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
	 	 * Retorna Todos Dados de Permissões dos usuários.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetPermUsua( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Usuarios::Inicia();

				try {
					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'GetRegPermUsua' ] );

					$Prepara->bindValue( ':usua_aces_cada_usua_iden', $Parametros[ 'usua_aces_cada_usua_iden' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );
					
					self::$Conn->commit();
					
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Usuarios',
						'status' => 'sucesso',
						'descricao' => 'Resultado Permissão Usuario',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Usuarios',
						'status' => 'invalido',
						'descricao' => 'Permissão Usuários com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
	 	 * Retorna Todos Dados da Tenant.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetTenanUsua( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Tenant::GetRegTenanTerce( $Parametros );
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
	 	 * Retorna se tem ou não Permissão.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetValiPermUsua( $Parametros = array() ){
			Usuarios::Inicia();

			try {
				self::$Conn->beginTransaction();

				$Prepara = self::$Conn->prepare( self::$RotSql[ 'SelValiPermUsua' ] );

				$Prepara->bindValue( ':usua_aces_cada_usua_iden', $Parametros[ 'usua_aces_cada_usua_iden' ] );
				$Prepara->bindValue( ':usua_aces_cada_opca_iden', $Parametros[ 'usua_aces_cada_opca_iden' ] );

				$Prepara->execute();
				
				$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );
					
				self::$Conn->commit();
					
				if ( $Retorno[0][ 'usua_aces_cada_iden' ] == 0 ){
					return array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Usuarios',
						'status' => 'restrito',
						'descricao' => 'Usuario Permissão de Acesso',
						'listreg' => 'Usuário não tem permissão',
					);
				} else {
					return array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Usuarios',
						'status' => 'sucesso',
						'descricao' => 'Usuario Permissão de Acesso',
						'listreg' => 'Usuário tem permissão',
					);
				}
			} catch ( PDOException $e ) {
				return array(
					'sistema' => Core::config( 'system_apelido' ),
					'modulo' => 'Usuarios',
					'status' => 'invalido',
					'descricao' => 'Usuarios Tenant com erro </br> '.$e->getMessage(),
					'listreg' => false,
				);
			};
		}

		/**
	 	 * Retorna Todos Dados Para Terceiros.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		 public static function GetRegUsuaTerce( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Usuarios::Inicia();

				try {
					if ( $Parametros[ 'usua_cada_tenant' ] == 0 || $Parametros[ 'usua_cada_tenant' ] == '' ){
						$Parametros[ 'usua_cada_tenant' ] = '%%';
					};
	
					if ( $Parametros[ 'usua_cada_empre' ] == 0 || $Parametros[ 'usua_cada_empre' ] == '' ){
						$Parametros[ 'usua_cada_empre' ] = '%%';
					};

					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( self::$RotSql[ 'GetTercRegUsua' ] );

					$Prepara->bindValue( ':usua_cada_status', $Parametros[ 'usua_cada_status' ] );
					$Prepara->bindValue( ':usua_cada_tenant', $Parametros[ 'usua_cada_tenant' ] );
					$Prepara->bindValue( ':usua_cada_empre', $Parametros[ 'usua_cada_empre' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					self::$Conn->commit();

					$Retorno = array_map( function( $input ) {
						return array(
							'id' => $input['usua_cada_iden'],
							'text' => $input['usua_cada_nome'],
						);
					}, $Retorno );

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Usuarios',
						'status' => 'sucesso',
						'descricao' => 'Resultado Terceiro Usuários',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Usuarios',
						'status' => 'invalido',
						'descricao' => 'Terceiro Usuários com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}
	}
?>