<?php
	namespace Back\Modulos\Laboratorio\Metalografia;

	use Back\Core\Core;
	use Back\Modulos\Comum\Tenant\Tenant;
	use Back\Modulos\Comum\Empresas\Empresas;
	use Back\Modulos\Comum\Usuarios\Usuarios;
	use Back\Modulos\Comum\Anexos\Anexos;
	use Back\Modulos\Laboratorio\Clientes\Clientes;
	use Back\Modulos\Laboratorio\Fabricantes\Fabricantes;
	use Back\Modulos\Laboratorio\Materiais\Materiais;
	use Back\Modulos\Laboratorio\Areas\Areas;
	use Back\Modulos\Laboratorio\Certificado\Certificado;

	use PDO;
	use PDOException;
	
	/**
 	 * Esta classe contendo rotinas das Metalografia
 	 * Todas as requisições dos amostras passam por aqui, são tratadas
 	 * e redirecionadas para o seu destino.
 	 *
 	 * @package    Metalografia
 	 * @author     Alexandre Farinelli Zardo
 	*/
	final class Metalografia {
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
			include_once( 'Metalografia.sql.php' );

			self::$RotSql[ 'GetRegMeta' ] = $GetRegMeta;
			
			self::$RotSql[ 'InstRegMeta' ] = $InstRegMeta;
			self::$RotSql[ 'UpdtRegMeta' ] = $UpdtRegMeta;

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
		public static function GetTenanMeta( $Parametros = array() ){
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
		public static function GetEmpreMeta( $Parametros = array() ){
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
		public static function GetClieMeta( $Parametros = array() ){
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
		public static function GetFabrMeta( $Parametros = array() ){
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
		public static function GetMateMeta( $Parametros = array() ){
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
		public static function GetAreaMeta( $Parametros = array() ){
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
		 public static function GetUsuaMeta( $Parametros = array() ){
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
		public static function GetMeta( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Metalografia::Inicia();

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

					$GetRegMeta = str_replace(
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
						 ( amos_meta_cada_fina LIKE :amos_meta_cada_fina OR
						   amos_meta_cada_fina IS NULL )',
						self::$RotSql[ 'GetRegMeta' ]
					);

					$Prepara = self::$Conn->prepare( $GetRegMeta );

					$Prepara->bindValue( ':amos_cada_regi', $Parametros[ 'amos_cada_regi' ] );
					$Prepara->bindValue( ':amos_cada_orse', $Parametros[ 'amos_cada_orse' ] );
					$Prepara->bindValue( ':amos_cada_emis_ini', Core::GetDataMariaDb( $Parametros[ 'amos_cada_emis_ini' ] ).' 00:00:00' );
					$Prepara->bindValue( ':amos_cada_emis_fim', Core::GetDataMariaDb( $Parametros[ 'amos_cada_emis_fim' ] ).' 23:59:59' );
					$Prepara->bindValue( ':amos_cada_clie_iden', $Parametros[ 'amos_cada_clie_iden' ] );
					$Prepara->bindValue( ':amos_cada_fabr_iden', $Parametros[ 'amos_cada_fabr_iden' ] );
					$Prepara->bindValue( ':amos_cada_area_iden', $Parametros[ 'amos_cada_area_iden' ] );
					$Prepara->bindValue( ':amos_cada_tenan', $Parametros[ 'amos_cada_tenan' ] );
					$Prepara->bindValue( ':amos_cada_empre', $Parametros[ 'amos_cada_empre' ] );
					$Prepara->bindValue( ':amos_meta_cada_fina', $Parametros[ 'amos_meta_cada_fina' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					self::$Conn->commit();

					$Retorno = array_map( function( $input ) {
						$Botao = '';
						$Figura = 'fas fa-eye';
						if ( isset( $input['amos_meta_cada_boto'] ) == false){
							
							if ( $input['amos_meta_cada_fina'] == 0 ){
								$Figura = 'fas fa-edit';
							};
							
							$Botao = $Botao.'
								<button id="EditBtnMeta" type="button" class="btn btn-secondary" title="ALTERAR"><i class="'.$Figura.'"></i></button>
								<button id="ImprBtnMeta" type="button" class="btn btn-success" title="IMPRIMIR"><i class="fas fa-print"></i></button>
								<button id="CertBtnMeta" type="button" class="btn btn-primary" title="CERTIFICADO"><i class="fas fa-certificate"></i></button>
							';
						};
						
						return array(
							'amos_meta_cada_boto' => $Botao,
							'amos_cada_iden' => $input['amos_cada_iden'],
							'amos_cada_regi' => $input['amos_cada_regi'],
							'amos_cada_orse' => $input['amos_cada_orse'],
							'clie_cada_nome' => $input['clie_cada_nome'],
							'fabr_cada_nome' => $input['fabr_cada_nome'],
							'mate_cada_descr' => $input['mate_cada_descr'],
							'area_cada_descr' => $input['area_cada_descr'],
							'amos_cada_emis' => $input['amos_cada_emis'],
							'amos_cada_descr' => $input['amos_cada_descr'],
							'amos_cada_local' => $input['amos_cada_local'],
							'amos_meta_cada_iden' => $input['amos_meta_cada_iden'],
							'amos_meta_cada_result' => $input['amos_meta_cada_result'],
							'amos_meta_cada_reag' => $input['amos_meta_cada_reag'],
							'amos_meta_cada_qtde' => $input['amos_meta_cada_qtde'],
							'amos_meta_cada_matriz' => $input['amos_meta_cada_matriz'],
							'amos_meta_cada_graos' => $input['amos_meta_cada_graos'],
							'amos_meta_cada_parti' => $input['amos_meta_cada_parti'],
							'amos_meta_cada_caract' => $input['amos_meta_cada_caract'],
							'amos_meta_cada_obs' => $input['amos_meta_cada_obs'],
							'amos_meta_cada_grafi' => $input['amos_meta_cada_grafi'],
							'amos_meta_cada_fina' => $input['amos_meta_cada_fina'],
							'amos_meta_cada_fina_data' => $input['amos_meta_cada_fina_data'],
							'amos_meta_cada_fina_usua_iden' => $input['amos_meta_cada_fina_usua_iden'],
							'amos_cada_tenan' => $input['amos_cada_tenan'],
							'amos_cada_empre' => $input['amos_cada_empre'],
						);
					}, $Retorno );
					
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Metalografia',
						'status' => 'sucesso',
						'descricao' => 'Resultado Pesquisa Metalografia',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Metalografia',
						'status' => 'invalido',
						'descricao' => 'Pesquisa Metalografia com erro </br> '.$e->getMessage(),
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
		public static function SetSalvMeta( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 92,
				);

				$PermiInclu = Core::Usuarios()::GetValiPermUsua( $ParamVali );
				
				$ParamVali = array(
					'usua_aces_cada_usua_iden' => Core::Sessao()::Get( 'usua_cada_iden' ),
					'usua_aces_cada_opca_iden' => 93,
				);
				
				$PermiAlter = Usuarios::GetValiPermUsua( $ParamVali );
				
				if ( ( $PermiInclu[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenMeta' ] == 'Automatico' ) ){
					return json_encode( $PermiInclu	);
				};
				
				if ( ( $PermiAlter[ 'status' ] == 'restrito' ) && ( $Parametros[ 'IdenMeta' ] != 'Automatico' ) ){
					return json_encode( $PermiAlter	);
				};
				Metalografia::Inicia();

				try {
					
					if ( $Parametros[ 'IdenMeta' ] == 'Automatico' ){
						$Parametros[ 'IdenMeta' ] = 0;
					};

					self::$Conn->beginTransaction();

					if ( $Parametros[ 'IdenMeta' ] == 0 ){
						$descricao = 'Inclusão de Metalografia';
						$Prepara = self::$Conn->prepare( self::$RotSql[ 'InstRegMeta' ] );
					} else {
						$descricao = 'Alteração de Metalografia';
						$Prepara = self::$Conn->prepare( self::$RotSql[ 'UpdtRegMeta' ] );
						$Prepara->bindValue( ':amos_meta_cada_iden', $Parametros[ 'IdenMeta' ] );
					};

					$Prepara->bindValue( ':amos_meta_cada_amos_iden', $Parametros[ 'IdenAmos' ] );
					$Prepara->bindValue( ':amos_meta_cada_reag', Core::UpperCase( $Parametros[ 'ReageMeta' ] ) );
					$Prepara->bindValue( ':amos_meta_cada_result', $Parametros[ 'ResulMeta' ] );
					$Prepara->bindValue( ':amos_meta_cada_qtde', str_replace( '.', '', $Parametros[ 'QtdeMeta' ] ) );
					$Prepara->bindValue( ':amos_meta_cada_grafi',  str_replace( array( 'false', 'true' ), array( '0', '1' ), $Parametros[ 'GrafiMeta' ] ) );
					$Prepara->bindValue( ':amos_meta_cada_matriz',  Core::UpperCase( $Parametros[ 'MatrizMeta' ] ) );
					$Prepara->bindValue( ':amos_meta_cada_graos',  Core::UpperCase( $Parametros[ 'GraosMeta' ] ) );
					$Prepara->bindValue( ':amos_meta_cada_parti',  Core::UpperCase( $Parametros[ 'PartiMeta' ] ) );
					$Prepara->bindValue( ':amos_meta_cada_caract',  Core::UpperCase( $Parametros[ 'CaracMeta' ] ) );
					$Prepara->bindValue( ':amos_meta_cada_obs',  Core::UpperCase( $Parametros[ 'ObseMeta' ] ) );
					
					$Prepara->bindValue( ':amos_meta_cada_fina', str_replace( array( 'false', 'true' ), array( '0', '1' ), $Parametros[ 'FinaMeta' ] ) );
					
					if ( $Parametros[ 'FinaMeta' ] == 'true' ){
						$Prepara->bindValue( ':amos_meta_cada_fina_data', Core::GetDataMariaDb( $Parametros[ 'DatFinaMeta' ] ) );
						$Prepara->bindValue( ':amos_meta_cada_fina_usua_iden', $Parametros[ 'ExcutMeta' ] );
					} else {
						$Prepara->bindValue( ':amos_meta_cada_fina_data', 'NULL' );
						$Prepara->bindValue( ':amos_meta_cada_fina_usua_iden', 'NULL' );
					}
					$Prepara->execute();
					
					if ( $descricao == 'Inclusão de Metalografia' ){
						$Retorno = self::$Conn->lastInsertId().' incluido';
						$Parametros[ 'IdenMeta' ] = self::$Conn->lastInsertId();
					} else {
						$Retorno = $Parametros[ 'IdenMeta' ].' alterado';
					};

					$RetorAnexos = Anexos::SetSalvAnex( $Parametros[ 'AnexosMeta' ], $Parametros[ 'anexo_ensa_tabe' ], $Parametros[ 'IdenMeta' ], self::$Conn );
					
					self::$Conn->commit();

					if ( $RetorAnexos['status'] == 'sucesso' ) {
							
						$status = 'sucesso';
						$listreg = 'Registro ID '.$Retorno;

						return json_encode( array(
							'sistema' => Core::config( 'system_apelido' ),
							'modulo' => 'Metalografia',
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
						'modulo' => 'Metalografia',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Metalografia com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
		 * Gera PDF a Metalografia cadastrada
		 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return arquivo
		 * @access public
		*/
		public static function SetImpreMeta( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Metalografia::Inicia();

				try{
					self::$Conn->beginTransaction();

					$GetRegMeta = str_replace(
						':FILTRO',
						'( amos_cada_iden = :amos_cada_iden )', 
						self::$RotSql[ 'GetRegMeta' ]
					);
					
					$Prepara = self::$Conn->prepare( $GetRegMeta );
					$Prepara->bindValue( ':amos_cada_iden', $Parametros[ 'IdenMeta' ] );
					
					$Prepara->execute();

					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );
					
					$Cabecalho = '
						<table border="0" style="border-collapse: collapse">
        					<tr>
          						<td width="100" height="100" align="center"></td>
	          					<td width="580" align="center">
    	        					<span style="font-size: 15pt"><b> ENSAIO METALOGRÁFICO </b></span>
        	  					</td>
              				</tr>
							<tr>
          						<td width="681">
									<hr style="height:1px; border:none; color:#000; background-color:#000"/>
								</td>
							</tr>
      					</table>
					';
					
					$amos_meta_cada_result = '';

					if ( $Retorno[0]['amos_meta_cada_result'] != -1 ){
						$amos_meta_cada_result = str_replace(
							array( 0, 1, 2, 3 ), 
							array( 'REPROVADO', 'INFORMATIVO', 'TOLERAVEL', 'APROVADO' ),
							$Retorno[0]['amos_meta_cada_result']
						);
					};

					$amos_meta_cada_fina_data = '';
					if ( $Retorno[0]['amos_meta_cada_fina_data'] != '' && $Retorno[0]['amos_meta_cada_fina_data'] != '0000-00-00 00:00:00' ){
						$amos_meta_cada_fina_data = date( Core::config( 'date_format' ), strtotime( $Retorno[0]['amos_meta_cada_fina_data'] ) );
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
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt">		
							<tr>
								<td width="170"> <b>Reagente: </b>'.$Retorno[0]['amos_meta_cada_reag'].'</td>
								<td width="170"> <b>Quantidade: </b>'.$Retorno[0]['amos_meta_cada_qtde'].'</td>
								<td width="170"> <b>Grafita ?: </b>'.str_replace( array( 0, 1 ), array( 'NÃO', 'SIM' ), $Retorno[0]['amos_meta_cada_grafi'] ).'</td>
								<td width="170" align="center" style="background-color:#d5d6d8;"> <b>Resultado: </b>'.$amos_meta_cada_result.'</td>
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
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 9pt">
							<tr>
								<td width="680" style="height:97px">
									 <b>Matriz</b>
								 	<br>
								 	 '.nl2br( $Retorno[0]['amos_meta_cada_matriz'] ).'
								</td>
							</tr>
      					</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 9pt">
							<tr>
								<td width="680" style="height:97px">
									 <b>Tamanho dos Grãos</b>
								 	<br>
								 	 '.nl2br( $Retorno[0]['amos_meta_cada_graos'] ).'
								</td>
							</tr>
      					</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 9pt">
							<tr>
								<td width="680" style="height:97px">
									 <b>Particularidades</b>
								 	<br>
								 	 '.nl2br( $Retorno[0]['amos_meta_cada_parti'] ).'
								</td>
							</tr>
      					</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 9pt">
							<tr>
								<td width="680" style="height:97px">
									 <b>Caracterização</b>
									<br>
									 '.nl2br( $Retorno[0]['amos_meta_cada_caract'] ).'
								</td>
							</tr>
						</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 9pt">
							<tr>
								<td width="680" style="height:97px">
									 <b>Observação</b>
									<br>
									 '.nl2br( $Retorno[0]['amos_meta_cada_obs'] ).'
								</td>
							</tr>
						</table>
						<br>
						<br>
						<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt">
							<tr>
								<td width="125"> <b>Finalizado ?: </b>'.str_replace( array( 0, 1 ), array( 'NÃO', 'SIM' ), $Retorno[0]['amos_meta_cada_fina'] ).'</td>
								<td width="180"> <b>Finalizado Em: </b>'.$amos_meta_cada_fina_data.'</td>
								<td width="375"> <b>Realizado Por: </b>'.$Retorno[0]['usua_cada_nome'].'</td>
							</tr>
						</table>
					';

					$CabeLogo = '';
					if( $Retorno[0]['sis_para_logo'] != '' ){
						$CabeLogo = str_replace( array( 'Back\Modulos\Laboratorio\Metalografia', 'Back/Modulos/Laboratorio/Metalografia' ), '', __DIR__ ).'Imagem/'.$Retorno[0]['sis_para_logo'];
					};

					$listreg = Core::SetGeraPdf(
						$Cabecalho,
						$Corpo,
						$CabeLogo,
						'P',
						'SIMPLES',
						array( 10, 40, 10, 5 )
					);

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Metalografia',
						'status' => 'sucesso',
						'descricao' => 'Impressão de Metalografia',
						'listreg' => $listreg,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Metalografia',
						'status' => 'invalido',
						'descricao' => 'Impressão de Metalografia com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
		 * Gera PDF a Metalografia cadastrada
		 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return arquivo
		 * @access public
		*/
		public static function SetImprCertMeta( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Certificado::SetImpreCert( $Parametros );
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
					'modulo' => 'Metalografia',
					'status' => 'sucesso',
					'descricao' => 'Exclusão de Arquivo',
					'listreg' => true,
				));
			} catch ( PDOException $e ) {
				return json_encode( array(
					'sistema' => Core::config( 'system_apelido' ),
					'modulo' => 'Metalografia',
					'status' => 'invalido',
					'descricao' => 'Exclusão de Arquivo com erro </br> '.$e->getMessage(),
					'listreg' => false,
				));
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
		public static function GetRegMetaTerce( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Metalografia::Inicia();

				try {
					self::$Conn->beginTransaction();

					$GetRegMeta = str_replace(
						':FILTRO',
						'( amos_cada_iden = :amos_cada_iden )', 
						self::$RotSql[ 'GetRegMeta' ]
					);
					
					$Prepara = self::$Conn->prepare( $GetRegMeta );
					$Prepara->bindValue( ':amos_cada_iden', $Parametros[ 'amos_cada_iden' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					self::$Conn->commit();

					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Metalografia',
						'status' => 'sucesso',
						'descricao' => 'Resultado Terceiro Metalografia',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Metalografia',
						'status' => 'invalido',
						'descricao' => 'Terceiro Metalografia com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				};
			} else {
				return json_encode( $vStatSess );
			};
		}
	}
?>