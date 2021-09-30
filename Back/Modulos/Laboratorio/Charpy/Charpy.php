<?php
	namespace Back\Modulos\Laboratorio\Charpy;

	use Back\Core\Core;
	use Back\Modulos\Comum\Tenant\Tenant;
	use Back\Modulos\Comum\Empresas\Empresas;
	use Back\Modulos\Comum\Usuarios\Usuarios;
	use Back\Modulos\Comum\Anexos\Anexos;
	use Back\Modulos\Laboratorio\Clientes\Clientes;
	use Back\Modulos\Laboratorio\Fabricantes\Fabricantes;
	use Back\Modulos\Laboratorio\Materiais\Materiais;
	use Back\Modulos\Laboratorio\Areas\Areas;

	use PDO;
	use PDOException;
	
	/**
 	 * Esta classe contendo rotinas Charpy
 	 * Todas as requisições Charpy passam por aqui, são tratadas
 	 * e redirecionadas para o seu destino.
 	 *
 	 * @package    Charpy
 	 * @author     Alexandre Farinelli Zardo
 	*/
	final class Charpy {
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
	 	 * Inicia modulo
	 	 *
		 * @return mixed
	 	 * @access public
	 	*/
		public static function Inicia(){
			include_once( 'Charpy.sql.php' );

			self::$RotSql[ 'GetRegCharp' ] = $GetRegCharp;
			
			self::$RotSql[ 'InstRegCharp' ] = $InstRegCharp;
			self::$RotSql[ 'UpdtRegCharp' ] = $UpdtRegCharp;

			self::$Conn = Core::Conecta();
		}

		/**
	 	 * Retorna Todos Dados da Tenant.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetTenanCharp( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Tenant::GetRegTenanTerce( $Parametros );
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
	 	 * Retorna Todos Dados da empresa.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetEmpreCharp( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Empresas::GetEmpreTerce( $Parametros );
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
	 	 * Retorna Todos Dados dos Clientes.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetClieCharp( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Clientes::GetRegClieTerce( $Parametros );
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
	 	 * Retorna Todos Dados dos Fabricantes.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetFabrCharp( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Fabricantes::GetRegFabrTerce( $Parametros );
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
	 	 * Retorna Todos Dados dos Materiais.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetMateCharp( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Materiais::GetRegMateTerce( $Parametros );
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
	 	 * Retorna Todos Dados dos Materiais.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetAreaCharp( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Areas::GetRegAreaTerce( $Parametros );
			} else {
				return json_encode( $vStatSess );
			};
		}
		
		/**
	 	 * Retorna Todos Dados dos Ususarios.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		 public static function GetUsuaCharp( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Usuarios::GetRegUsuaTerce( $Parametros );
			} else {
				return json_encode( $vStatSess );
			};
		}
		
		/**
	 	 * Retorna Todos Dados.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetCharp( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Charpy::Inicia();

				if ( $Parametros[ 'amos_cada_tenan' ] == 0 || $Parametros[ 'amos_cada_tenan' ] == '' ){
					$Parametros[ 'amos_cada_tenan' ] = '%%';
				};

				if ( $Parametros[ 'amos_cada_empre' ] == 0 || $Parametros[ 'amos_cada_empre' ] == '' ){
					$Parametros[ 'amos_cada_empre' ] = '%%';
				};

				if ( $Parametros[ 'amos_cada_clie_iden' ] == 0 || $Parametros[ 'amos_cada_clie_iden' ] == '' ){
					$Parametros[ 'amos_cada_clie_iden' ] = '%%';
				};

				if ( $Parametros[ 'amos_cada_fabr_iden' ] == 0 || $Parametros[ 'amos_cada_fabr_iden' ] == '' ){
					$Parametros[ 'amos_cada_fabr_iden' ] = '%%';
				};

				if ( $Parametros[ 'amos_cada_area_iden' ] == 0 || $Parametros[ 'amos_cada_area_iden' ] == '' ){
					$Parametros[ 'amos_cada_area_iden' ] = '%%';
				};
				
				try {
					self::$Conn->beginTransaction();

					$GetRegCharp = str_replace(
						':FILTRO',
						'( amos_cada_regi LIKE :amos_cada_regi ) AND
						 ( amos_cada_orse LIKE :amos_cada_orse ) AND
						 ( amos_cada_emis >= :amos_cada_emis_ini AND
						   amos_cada_emis <= :amos_cada_emis_fim ) AND
						 ( amos_cada_clie_iden LIKE :amos_cada_clie_iden ) AND
						 ( amos_cada_fabr_iden LIKE :amos_cada_fabr_iden ) AND
						 ( amos_cada_area_iden LIKE :amos_cada_area_iden ) AND
						 ( amos_cada_tenan LIKE :amos_cada_tenan ) AND
						 ( amos_cada_empre LIKE :amos_cada_empre ) AND
						 ( amos_charpy_cada_fina LIKE :amos_charpy_cada_fina OR
						   amos_charpy_cada_fina IS NULL )',
						self::$RotSql[ 'GetRegCharp' ]
					);

					$Prepara = self::$Conn->prepare( $GetRegCharp );

					$Prepara->bindValue( ':amos_cada_regi', $Parametros[ 'amos_cada_regi' ] );
					$Prepara->bindValue( ':amos_cada_orse', $Parametros[ 'amos_cada_orse' ] );
					$Prepara->bindValue( ':amos_cada_emis_ini', Core::GetDataMariaDb( $Parametros[ 'amos_cada_emis_ini' ] ).' 00:00:00' );
					$Prepara->bindValue( ':amos_cada_emis_fim', Core::GetDataMariaDb( $Parametros[ 'amos_cada_emis_fim' ] ).' 23:59:59' );
					$Prepara->bindValue( ':amos_cada_clie_iden', $Parametros[ 'amos_cada_clie_iden' ] );
					$Prepara->bindValue( ':amos_cada_fabr_iden', $Parametros[ 'amos_cada_fabr_iden' ] );
					$Prepara->bindValue( ':amos_cada_area_iden', $Parametros[ 'amos_cada_area_iden' ] );
					$Prepara->bindValue( ':amos_cada_tenan', $Parametros[ 'amos_cada_tenan' ] );
					$Prepara->bindValue( ':amos_cada_empre', $Parametros[ 'amos_cada_empre' ] );
					$Prepara->bindValue( ':amos_charpy_cada_fina', $Parametros[ 'amos_charpy_cada_fina' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					self::$Conn->commit();

					$Retorno = array_map( function( $input ) {
						$Botao = '';
						$Figura = 'fas fa-eye';
						if ( isset( $input['amos_charpy_cada_boto'] ) == false){
							
							if ( $input['amos_charpy_cada_fina'] == 0 ){
								$Figura = 'fas fa-edit';
							};
							
							$Botao = $Botao.'
								<button id="EditBtnCharp" type="button" class="btn btn-secondary" title="ALTERAR"><i class="'.$Figura.'"></i></button>
								<button id="ImprBtnCharp" type="button" class="btn btn-success" title="IMPRIMIR"><i class="fas fa-print"></i></button>
							';
						};
						
						return array(
							'amos_charpy_cada_boto' => $Botao,
							'amos_cada_iden' => $input['amos_cada_iden'],
							'amos_cada_regi' => $input['amos_cada_regi'],
							'amos_cada_orse' => $input['amos_cada_orse'],
							'clie_cada_nome' => $input['clie_cada_nome'],
							'fabr_cada_nome' => $input['fabr_cada_nome'],
							'mate_cada_descr' => $input['mate_cada_descr'],
							'mate_cada_impa' => $input['mate_cada_impa'],
							'area_cada_descr' => $input['area_cada_descr'],
							'amos_cada_emis' => $input['amos_cada_emis'],
							'amos_cada_descr' => $input['amos_cada_descr'],
							'amos_cada_local' => $input['amos_cada_local'],
							'amos_cada_tenan' => $input['amos_cada_tenan'],
							'amos_cada_empre' => $input['amos_cada_empre'],
							'amos_charpy_cada_iden' => $input['amos_charpy_cada_iden'],
							'amos_charpy_cada_qtde' => $input['amos_charpy_cada_qtde'],
							'amos_charpy_cada_result' => $input['amos_charpy_cada_result'],
							'amos_charpy_cada_charpy_espe' => $input['amos_charpy_cada_charpy_espe'],
							'amos_charpy_cada_charpy_obti' => $input['amos_charpy_cada_charpy_obti'],
							'amos_charpy_cada_obs' => $input['amos_charpy_cada_obs'],
							'amos_charpy_cada_fina' => $input['amos_charpy_cada_fina'],
							'amos_charpy_cada_fina_data' => $input['amos_charpy_cada_fina_data'],
							'amos_charpy_cada_fina_usua_iden' => $input['amos_charpy_cada_fina_usua_iden'],
						);
					}, $Retorno );
					
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Charpy',
						'status' => 'sucesso',
						'descricao' => 'Resultado Pesquisa Charpy',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Charpy',
						'status' => 'invalido',
						'descricao' => 'Pesquisa Charpy com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}
		
		/**
		 * Salva quando for inclusão ou alteração.
		 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return integer Ultimo id
		 * @access public
		*/
		public static function SetSalvCharp( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 112,
				);

				$PermiInclu = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 113,
				);
				
				$PermiAlter = Usuarios::GetValiPermUsua( $ParamVali );
				
				if ( ( $PermiInclu[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenCharp' ] == 'Automatico' ) ){
					return json_encode( $PermiInclu	);
				};
				
				if ( ( $PermiAlter[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenCharp' ] != 'Automatico' ) ){
					return json_encode( $PermiAlter	);
				};
				Charpy::Inicia();

				try {
					
					if ( $Parametros[ 'IdenCharp' ] == 'Automatico' ){
						$Parametros[ 'IdenCharp' ] = 0;
					};

					self::$Conn->beginTransaction();

					if ( $Parametros[ 'IdenCharp' ] == 0 ){
						$descricao = 'Inclusão de Charpy';
						$Prepara = self::$Conn->prepare( self::$RotSql[ 'InstRegCharp' ] );
					} else {
						$descricao = 'Alteração de Charpy';
						$Prepara = self::$Conn->prepare( self::$RotSql[ 'UpdtRegCharp' ] );
						$Prepara->bindValue( ':amos_charpy_cada_iden', $Parametros[ 'IdenCharp' ] );
					};

					$Prepara->bindValue( ':amos_charpy_cada_amos_iden', $Parametros[ 'IdenAmos' ] );
					$Prepara->bindValue( ':amos_charpy_cada_qtde', str_replace( '.', '', $Parametros[ 'QtdeCharp' ] ) );
					$Prepara->bindValue( ':amos_charpy_cada_result', $Parametros[ 'ResulCharp' ] );
					$Prepara->bindValue( ':amos_charpy_cada_charpy_espe', $Parametros[ 'EspeCharp' ] );
					$Prepara->bindValue( ':amos_charpy_cada_charpy_obti', $Parametros[ 'ObitCharp' ] );
					$Prepara->bindValue( ':amos_charpy_cada_obs',  Core::UpperCase( $Parametros[ 'ObseCharp' ] ) );
					$Prepara->bindValue( ':amos_charpy_cada_fina', str_replace( array( 'false', 'true' ), array( '0', '1' ), $Parametros[ 'FinaCharp' ] ) );

					if ( $Parametros[ 'FinaCharp' ] == 'true' ){
						$Prepara->bindValue( ':amos_charpy_cada_fina_data', Core::GetDataMariaDb( $Parametros[ 'DatFinaCharp' ] ) );
						$Prepara->bindValue( ':amos_charpy_cada_fina_usua_iden', $Parametros[ 'ExcutCharp' ] );
					} else {
						$Prepara->bindValue( ':amos_charpy_cada_fina_data', 'NULL' );
						$Prepara->bindValue( ':amos_charpy_cada_fina_usua_iden', 'NULL' );
					}
					$Prepara->execute();
					
					if ( $descricao == 'Inclusão de Charpy' ){
						$Retorno = self::$Conn->lastInsertId().' incluido';
						$Parametros[ 'IdenCharp' ] = self::$Conn->lastInsertId();
					} else {
						$Retorno = $Parametros[ 'IdenCharp' ].' alterado';
					};


					$RetorAnexos = Anexos::SetSalvAnex( $Parametros[ 'AnexosCharp' ], $Parametros[ 'anexo_ensa_tabe' ], $Parametros[ 'IdenCharp' ], self::$Conn );

					self::$Conn->commit();

					if ( $RetorAnexos['status'] == 'sucesso' ) {
							
						$status = 'sucesso';
						$listreg = 'Registro ID '.$Retorno;

						return json_encode( array(
							'sistema' => Core::config( 'system_apelido' ),
							'modulo' => 'Charpy',
							'status' => $status,
							'descricao' => $descricao,
							'listreg' => $listreg,
						));
					} else {
						return json_encode( $RetorAnexos );
					};
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Charpy',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Charpy com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
		 * Gera PDF a amostra cadastrada
		 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return integer Ultimo id
		 * @access public
		*/
		public static function SetImpreCharp( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Charpy::Inicia();

				try{
					self::$Conn->beginTransaction();

					$GetRegMeta = str_replace(
						':FILTRO',
						'( amos_cada_iden = :amos_cada_iden )', 
						self::$RotSql[ 'GetRegCharp' ]
					);
					
					$Prepara = self::$Conn->prepare( $GetRegMeta );
					$Prepara->bindValue( ':amos_cada_iden', $Parametros[ 'IdenCharp' ] );
					
					$Prepara->execute();

					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );
					
					$Cabecalho = '
						<table border="0" style="border-collapse: collapse">
        					<tr>
          						<td width="100" height="100" align="center"></td>
	          					<td width="580" align="center">
    	        					<span style="font-size: 15pt"><b> CHARPY </b></span>
        	  					</td>
              				</tr>
							<tr>
          						<td width="681">
									<hr style="height:1px; border:none; color:#000; background-color:#000"/>
								</td>
							</tr>
      					</table>
					';
					
					$amos_charpy_cada_result = '';

					if ( $Retorno[0]['amos_charpy_cada_result'] != -1 ){
						$amos_charpy_cada_result = str_replace(
							array( 0, 1, 2, 3 ), 
							array( 'REPROVADO', 'INFORMATIVO', 'TOLERAVEL', 'APROVADO' ),
							$Retorno[0]['amos_charpy_cada_result']
						);
					};

					$amos_charpy_cada_fina_data = '';
					if ( $Retorno[0]['amos_charpy_cada_fina_data'] != '' && $Retorno[0]['amos_charpy_cada_fina_data'] != '0000-00-00 00:00:00' ){
						$amos_charpy_cada_fina_data = date( Core::config( 'date_format' ), strtotime( $Retorno[0]['amos_charpy_cada_fina_data'] ) );
					};

					$Corpo = '
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt">
        					<tr>
          						<td width="170"> <b>R.G.: </b>'.$Retorno[0]['amos_cada_regi'].'</td>
	          					<td width="170"> <b>O.S.: </b>'.$Retorno[0]['amos_cada_orse'].'</td>
          						<td width="170"> <b>Emissão: </b>'.date( Core::config( 'date_format' ), strtotime( $Retorno[0]['amos_cada_emis'] ) ).'</td>
	          					<td width="170"> <b>Local: '.$Retorno[0]['amos_cada_local'].'</b></td>
              				</tr>
							<tr>
							  <td width="340"> <b>Cliente: </b>'.$Retorno[0]['clie_cada_nome'].'</td>
							  <td width="340"> <b>Fabricante: </b>'.$Retorno[0]['fabr_cada_nome'].'</td>
						 	</tr>
							<tr>
								<td width="340"> <b>Material: </b>'.$Retorno[0]['mate_cada_descr'].'</td>
							 	<td width="340"> <b>Área: </b>'.$Retorno[0]['area_cada_descr'].'</td>
							</tr>
						</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 9pt">
							<tr>
								<td width="680" style="height:97px">
									 <b>Descrição</b>
								 	<br>
								 	 '.nl2br( $Retorno[0]['amos_cada_descr'] ).'
								</td>
							</tr>
						</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt">		
							<tr>
								<td width="340"> <b>Quantidade: </b>'.$Retorno[0]['amos_charpy_cada_qtde'].'</td>
								<td width="340" align="center" style="background-color:#d5d6d8;"> <b>Charpy: </b>'.$amos_charpy_cada_result.'</td>
							</tr>
						</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt">		
							<tr>
								<td width="340"> <b>Especificado: </b>'.$Retorno[0]['amos_charpy_cada_charpy_espe'].'</td>
								<td width="340"> <b>Obtido: </b>'.$Retorno[0]['amos_charpy_cada_charpy_obti'].'</td>
							</tr>
						</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 9pt">
							<tr>
								<td width="680" style="height:97px">
									 <b>Observação</b>
									<br>
									 '.nl2br( $Retorno[0]['amos_charpy_cada_obs'] ).'
								</td>
							</tr>
						</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt">
							<tr>
								<td width="125"> <b>Finalizado ?: </b>'.str_replace( array( 0, 1 ), array( 'NÃO', 'SIM' ), $Retorno[0]['amos_charpy_cada_fina'] ).'</td>
								<td width="180"> <b>Finalizado Em: </b>'.$amos_charpy_cada_fina_data.'</td>
								<td width="375"> <b>Realizado Por: </b>'.$Retorno[0]['usua_cada_nome'].'</td>
							</tr>
						</table>
					';

					$listreg = Core::SetGeraPdf(
						$Cabecalho,
						$Corpo,
						str_replace( array( 'Back\Modulos\Laboratorio\Charpy', 'Back/Modulos/Laboratorio/Charpy' ), '', __DIR__ ).'Imagem/'.$Retorno[0]['sis_para_logo'],
						'P',
						'SIMPLES',
						array( 10, 40, 10, 5 )
					);

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Charpy',
						'status' => 'sucesso',
						'descricao' => 'Impressão de Charpy',
						'listreg' => $listreg,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Charpy',
						'status' => 'invalido',
						'descricao' => 'Impressão de Charpy com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
		 * Exclui arquivos.
		 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return boolean
		 * @access public
		*/
		public static function SetExclArqu( $Parametros = array() ){
			try{
				Core::GetExclArqu( $Parametros['ArquiExcl'] );
				return json_encode( array(
					'sistema' => Core::config( 'system_apelido' ),
					'modulo' => 'Charpy',
					'status' => 'sucesso',
					'descricao' => 'Exclusão de Arquivo',
					'listreg' => true,
				));
			} catch ( PDOException $e ) {
				return json_encode( array(
					'sistema' => Core::config( 'system_apelido' ),
					'modulo' => 'Charpy',
					'status' => 'invalido',
					'descricao' => 'Exclusão de Arquivo com erro </br> '.$e->getMessage(),
					'listreg' => false,
				));
			};
		}
	}
?>