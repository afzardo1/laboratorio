<?php
	namespace Back\Modulos\Comum\Anexos;

	use Back\Core\Core;

	use PDO;
	use PDOException;
	/**
 	 * Esta classe contendo rotinas dos Anexos
 	 * Todas as requisições dos anexos passam por aqui, são tratadas
 	 * e redirecionadas para o seu destino.
 	 *
 	 * @package    Anexos
 	 * @author     Alexandre Farinelli Zardo
 	*/
	final class Anexos {
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
			include_once( 'Anexos.sql.php' );

			self::$RotSql[ 'GetRegAnex' ] = $GetRegAnex;

			self::$RotSql[ 'InstRegAnex' ] = $InstRegAnex;
			self::$RotSql[ 'UpdtRegAnex' ] = $UpdtRegAnex;
			self::$RotSql[ 'DeleRegAnex' ] = $DeleRegAnex;
		
			self::$Conn = Core::Conecta();
		}

		/**
	 	 * Retorna Todos Dados.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		public static function GetAnex( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				Anexos::Inicia();

				if ( $Parametros[ 'anexo_ensa_tabe' ] == 'ACHATAMENTO' ){
					$GetRegAnex =  str_replace(
						array(
							':CAMPOS_ANEXO',
							':TABELA_ANEXO',
							':FILTRO_ANEXO',
							':ORDEM_ANEXO',
						),
						array(
							'amos_achat_anexo_cada_iden,
							 amos_achat_anexo_achat_iden,
							 amos_achat_anexo_tipo,
							 amos_achat_anexo_descr,
							 amos_achat_anexo_arqui
							',
							'labo_amos_achat_anexo_cada',
							'amos_achat_anexo_achat_iden = :anexo_ensa_iden',
							'amos_achat_anexo_tipo DESC',
						),
						
						self::$RotSql[ 'GetRegAnex' ]
					);
				};
				
				if ( $Parametros[ 'anexo_ensa_tabe' ] == 'DOBRAMENTO' ){
					$GetRegAnex =  str_replace(
						array(
							':CAMPOS_ANEXO',
							':TABELA_ANEXO',
							':FILTRO_ANEXO',
							':ORDEM_ANEXO',
						),
						array(
							'amos_dobra_anexo_cada_iden,
							 amos_dobra_anexo_dobra_iden,
							 amos_dobra_anexo_tipo,
							 amos_dobra_anexo_descr,
							 amos_dobra_anexo_arqui
							',
							'labo_amos_dobra_anexo_cada',
							'amos_dobra_anexo_dobra_iden = :anexo_ensa_iden',
							'amos_dobra_anexo_tipo DESC',
						),
						
						self::$RotSql[ 'GetRegAnex' ]
					);
				};

				if ( $Parametros[ 'anexo_ensa_tabe' ] == 'DUREZA' ){
					$GetRegAnex =  str_replace(
						array(
							':CAMPOS_ANEXO',
							':TABELA_ANEXO',
							':FILTRO_ANEXO',
							':ORDEM_ANEXO',
						),
						array(
							'amos_dure_anexo_cada_iden,
							 amos_dure_anexo_dure_iden,
							 amos_dure_anexo_tipo,
							 amos_dure_anexo_descr,
							 amos_dure_anexo_arqui
							',
							'labo_amos_dure_anexo_cada',
							'amos_dure_anexo_dure_iden = :anexo_ensa_iden',
							'amos_dure_anexo_tipo DESC',
						),
						
						self::$RotSql[ 'GetRegAnex' ]
					);
				};

				if ( $Parametros[ 'anexo_ensa_tabe' ] == 'CHARPY' ){
					$GetRegAnex =  str_replace(
						array(
							':CAMPOS_ANEXO',
							':TABELA_ANEXO',
							':FILTRO_ANEXO',
							':ORDEM_ANEXO',
						),
						array(
							'amos_charpy_anexo_cada_iden,
							 amos_charpy_anexo_charpy_iden,
							 amos_charpy_anexo_tipo,
							 amos_charpy_anexo_descr,
							 amos_charpy_anexo_arqui
							',
							'labo_amos_charpy_anexo_cada',
							'amos_charpy_anexo_charpy_iden = :anexo_ensa_iden',
							'amos_charpy_anexo_tipo DESC',
						),
						
						self::$RotSql[ 'GetRegAnex' ]
					);
				};

				if ( $Parametros[ 'anexo_ensa_tabe' ] == 'MACROGRAFIA' ){
					$GetRegAnex =  str_replace(
						array(
							':CAMPOS_ANEXO',
							':TABELA_ANEXO',
							':FILTRO_ANEXO',
							':ORDEM_ANEXO',
						),
						array(
							'amos_macro_anexo_cada_iden,
							 amos_macro_anexo_macro_iden,
							 amos_macro_anexo_tipo,
							 amos_macro_anexo_descr,
							 amos_macro_anexo_arqui
							',
							'labo_amos_macro_anexo_cada',
							'amos_macro_anexo_macro_iden = :anexo_ensa_iden',
							'amos_macro_anexo_tipo DESC',
						),
						
						self::$RotSql[ 'GetRegAnex' ]
					);
				};

				if ( $Parametros[ 'anexo_ensa_tabe' ] == 'METALOGRAFIA' ){
					$GetRegAnex =  str_replace(
						array(
							':CAMPOS_ANEXO',
							':TABELA_ANEXO',
							':FILTRO_ANEXO',
							':ORDEM_ANEXO',
						),
						array(
							'amos_meta_anexo_cada_iden,
							 amos_meta_anexo_meta_iden,
							 amos_meta_anexo_tipo,
							 amos_meta_anexo_descr,
							 amos_meta_anexo_arqui
							',
							'labo_amos_meta_anexo_cada',
							'amos_meta_anexo_meta_iden = :anexo_ensa_iden',
							'amos_meta_anexo_tipo DESC',
						),
						
						self::$RotSql[ 'GetRegAnex' ]
					);
				};

				try {
					self::$Conn->beginTransaction();

					$Prepara = self::$Conn->prepare( $GetRegAnex );

					$Prepara->bindValue( ':anexo_ensa_iden', $Parametros[ 'anexo_ensa_iden' ] );

					$Prepara->execute();
				
					$Retorno = $Prepara->fetchAll( PDO::FETCH_ASSOC );

					self::$Conn->commit();

					$Retorno = array_map( function( $input ) {
						$Botao = '';

						if ( array_key_exists( 'amos_achat_anexo_cada_iden', $input ) ) {
							$Campos = array ( 
								0 => 'amos_achat_anexo_cada_iden',
							 	1 => 'amos_achat_anexo_achat_iden',
							 	2 => 'amos_achat_anexo_tipo',
							 	3 => 'amos_achat_anexo_descr',
							 	4 => 'amos_achat_anexo_arqui'
							);

							$ItemName = array(
								0 => 'DeleAnexBtnAchat',
								1 => 'DownAnexBtnAchat',
								2 => 'TipoAnexAchat',
								3 => 'DescrAnexAchat',
								4 => 'FileAnexAchat',
								5 => 'FileAnexLabeAchat',
							);
						};

						if ( array_key_exists( 'amos_dobra_anexo_cada_iden', $input ) ) {
							$Campos = array ( 
								0 => 'amos_dobra_anexo_cada_iden',
							 	1 => 'amos_dobra_anexo_dobra_iden',
							 	2 => 'amos_dobra_anexo_tipo',
							 	3 => 'amos_dobra_anexo_descr',
							 	4 => 'amos_dobra_anexo_arqui'
							);

							$ItemName = array(
								0 => 'DeleAnexBtnDobra',
								1 => 'DownAnexBtnDobra',
								2 => 'TipoAnexDobra',
								3 => 'DescrAnexDobra',
								4 => 'FileAnexDobra',
								5 => 'FileAnexLabeDobra',
							);
						};

						if ( array_key_exists( 'amos_dure_anexo_cada_iden', $input ) ) {
							$Campos = array ( 
								0 => 'amos_dure_anexo_cada_iden',
							 	1 => 'amos_dure_anexo_dure_iden',
							 	2 => 'amos_dure_anexo_tipo',
							 	3 => 'amos_dure_anexo_descr',
							 	4 => 'amos_dure_anexo_arqui'
							);

							$ItemName = array(
								0 => 'DeleAnexBtnDure',
								1 => 'DownAnexBtnDure',
								2 => 'TipoAnexDure',
								3 => 'DescrAnexDure',
								4 => 'FileAnexDure',
								5 => 'FileAnexLabeDure',
							);
						};

						if ( array_key_exists( 'amos_charpy_anexo_cada_iden', $input ) ) {
							$Campos = array ( 
								0 => 'amos_charpy_anexo_cada_iden',
							 	1 => 'amos_charpy_anexo_charpy_iden',
							 	2 => 'amos_charpy_anexo_tipo',
							 	3 => 'amos_charpy_anexo_descr',
							 	4 => 'amos_charpy_anexo_arqui'
							);

							$ItemName = array(
								0 => 'DeleAnexBtnCharp',
								1 => 'DownAnexBtnCharp',
								2 => 'TipoAnexCharp',
								3 => 'DescrAnexCharp',
								4 => 'FileAnexCharp',
								5 => 'FileAnexLabeCharp',
							);
						};

						if ( array_key_exists( 'amos_macro_anexo_cada_iden', $input ) ) {
							$Campos = array ( 
								0 => 'amos_macro_anexo_cada_iden',
							 	1 => 'amos_macro_anexo_macro_iden',
							 	2 => 'amos_macro_anexo_tipo',
							 	3 => 'amos_macro_anexo_descr',
							 	4 => 'amos_macro_anexo_arqui'
							);

							$ItemName = array(
								0 => 'DeleAnexBtnMacro',
								1 => 'DownAnexBtnMacro',
								2 => 'TipoAnexMacro',
								3 => 'DescrAnexMacro',
								4 => 'FileAnexMacro',
								5 => 'FileAnexLabeMacro',
							);
						};

						if ( array_key_exists( 'amos_meta_anexo_cada_iden', $input ) ) {
							$Campos = array ( 
								0 => 'amos_meta_anexo_cada_iden',
							 	1 => 'amos_meta_anexo_meta_iden',
							 	2 => 'amos_meta_anexo_tipo',
							 	3 => 'amos_meta_anexo_descr',
							 	4 => 'amos_meta_anexo_arqui'
							);

							$ItemName = array(
								0 => 'DeleAnexBtnMeta',
								1 => 'DownAnexBtnMeta',
								2 => 'TipoAnexMeta',
								3 => 'DescrAnexMeta',
								4 => 'FileAnexMeta',
								5 => 'FileAnexLabeMeta',
							);
						};

						if ( isset( $input['anexo_botao'] ) == false ){
							$Botao = '
								<button id="'.$ItemName[0].'" type="button" class="btn btn-danger" title="EXCLUIR"><i class="fas fa-minus"></i></button>
								<button id="'.$ItemName[1].'" type="button" class="btn btn-secondary" title="DONLOAD"><i class="fas fa-cloud-download-alt"></i></button>
							';
						};

						return array(
							'anexo_botao' => $Botao,
							'anexo_cada_iden' => $input[ $Campos[0] ],
							'anexo_tipo' => 
								'<select id="'.$ItemName[2].'" class="form-select" aria-label="Default select example">
									<option value="0">ANEXOS</option>
									<option value="1">FOTOS</option>
								</select>',
							'anexo_descr' => '<input id="'.$ItemName[3].'" type="text" class="form-control" value="'.$input[ $Campos[3] ].'">',
							'anexo_arqui' =>
								'<div class="custom-file">
									<input id="'.$ItemName[4].'" type="file" data-arqu="" data-value="" class="custom-file-input">
									<label id="'.$ItemName[5].'" class="custom-file-label" for="FileAnexPedi" data-browse="Selecionar">'.$input[ $Campos[4] ].'</label>
								</div>',
							'anexo_arqui_ante' => $input[ $Campos[4] ],
						);
					}, $Retorno );

 					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Anexos',
						'status' => 'sucesso',
						'descricao' => 'Resultado Pesquisa Anexos',
						'listreg' => $Retorno,
					));
				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Anexos',
						'status' => 'invalido',
						'descricao' => 'Pesquisa Anexos com erro </br> '.$e->getMessage(),
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
		public static function SetSalvAnex( $Parametros, $vEnsaTabe, $vEnsaiIdem, $vConn ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {

				Anexos::Inicia();
				
				$descricao = '';
				
				try {

					$Parametros = json_decode( $Parametros, false );
					foreach ( $Parametros as $Lin => $Val ){
						
						if ( $Val->anexo_cada_iden == 'Automatico' ){
							$Val->anexo_cada_iden = 0;
						};
	
						if (  $Val->anexo_cada_iden == 0 ){
							$descricao = 'Inclusão de Anexos';

							if ( $vEnsaTabe == 'ACHATAMENTO' ){
								$InstRegAnex = str_replace(
									array(
										':CAMPOS_ANEXO',
										':TABELA_ANEXO',
										':VALUE_CAMPOS_ANEXO',
									),
									array(
										'amos_achat_anexo_achat_iden,
										 amos_achat_anexo_tipo,
										 amos_achat_anexo_descr,
										 amos_achat_anexo_arqui
										',
										'labo_amos_achat_anexo_cada',
										':anexo_ensa_iden,
										 :anexo_tipo,
										 :anexo_descr,
										 :anexo_arqui
										',
									),
									
									self::$RotSql[ 'InstRegAnex' ]
								);
							};

							if ( $vEnsaTabe == 'DOBRAMENTO' ){
								$InstRegAnex = str_replace(
									array(
										':CAMPOS_ANEXO',
										':TABELA_ANEXO',
										':VALUE_CAMPOS_ANEXO',
									),
									array(
										'amos_dobra_anexo_dobra_iden,
										 amos_dobra_anexo_tipo,
										 amos_dobra_anexo_descr,
										 amos_dobra_anexo_arqui
										',
										'labo_amos_dobra_anexo_cada',
										':anexo_ensa_iden,
										 :anexo_tipo,
										 :anexo_descr,
										 :anexo_arqui
										',
									),
									
									self::$RotSql[ 'InstRegAnex' ]
								);
							};

							if ( $vEnsaTabe == 'DUREZA' ){
								$InstRegAnex = str_replace(
									array(
										':CAMPOS_ANEXO',
										':TABELA_ANEXO',
										':VALUE_CAMPOS_ANEXO',
									),
									array(
										'amos_dure_anexo_dure_iden,
										 amos_dure_anexo_tipo,
										 amos_dure_anexo_descr,
										 amos_dure_anexo_arqui
										',
										'labo_amos_dure_anexo_cada',
										':anexo_ensa_iden,
										 :anexo_tipo,
										 :anexo_descr,
										 :anexo_arqui
										',
									),
									
									self::$RotSql[ 'InstRegAnex' ]
								);
							};

							if ( $vEnsaTabe == 'CHARPY' ){
								$InstRegAnex = str_replace(
									array(
										':CAMPOS_ANEXO',
										':TABELA_ANEXO',
										':VALUE_CAMPOS_ANEXO',
									),
									array(
										'amos_charpy_anexo_charpy_iden,
										 amos_charpy_anexo_tipo,
										 amos_charpy_anexo_descr,
										 amos_charpy_anexo_arqui
										',
										'labo_amos_charpy_anexo_cada',
										':anexo_ensa_iden,
										 :anexo_tipo,
										 :anexo_descr,
										 :anexo_arqui
										',
									),
									
									self::$RotSql[ 'InstRegAnex' ]
								);
							};

							if ( $vEnsaTabe == 'MACROGRAFIA' ){
								$InstRegAnex = str_replace(
									array(
										':CAMPOS_ANEXO',
										':TABELA_ANEXO',
										':VALUE_CAMPOS_ANEXO',
									),
									array(
										'amos_macro_anexo_macro_iden,
										 amos_macro_anexo_tipo,
										 amos_macro_anexo_descr,
										 amos_macro_anexo_arqui
										',
										'labo_amos_macro_anexo_cada',
										':anexo_ensa_iden,
										 :anexo_tipo,
										 :anexo_descr,
										 :anexo_arqui
										',
									),
									
									self::$RotSql[ 'InstRegAnex' ]
								);
							};

							if ( $vEnsaTabe == 'METALOGRAFIA' ){
								$InstRegAnex = str_replace(
									array(
										':CAMPOS_ANEXO',
										':TABELA_ANEXO',
										':VALUE_CAMPOS_ANEXO',
									),
									array(
										'amos_meta_anexo_meta_iden,
										 amos_meta_anexo_tipo,
										 amos_meta_anexo_descr,
										 amos_meta_anexo_arqui
										',
										'labo_amos_meta_anexo_cada',
										':anexo_ensa_iden,
										 :anexo_tipo,
										 :anexo_descr,
										 :anexo_arqui
										',
									),
									
									self::$RotSql[ 'InstRegAnex' ]
								);
							};

							$Prepara = $vConn->prepare( $InstRegAnex );
						} else {
							$descricao = 'Alteração de Anexos';
							
							if ( $vEnsaTabe == 'ACHATAMENTO' ){
								$UpdtRegAnex = str_replace(
									array(
										':CAMPOS_ANEXO',
										':TABELA_ANEXO',
										':FILTRO_ANEXO',
									),
									array(
										'amos_achat_anexo_achat_iden = :anexo_ensa_iden,
										 amos_achat_anexo_tipo = :anexo_tipo,
										 amos_achat_anexo_descr = :anexo_descr,
										 amos_achat_anexo_arqui = :anexo_arqui
										',
										'labo_amos_achat_anexo_cada',
										'amos_achat_anexo_cada_iden = :anexo_cada_iden',
									),
									
									self::$RotSql[ 'UpdtRegAnex' ]
								);
							};

							if ( $vEnsaTabe == 'DOBRAMENTO' ){
								$UpdtRegAnex = str_replace(
									array(
										':CAMPOS_ANEXO',
										':TABELA_ANEXO',
										':FILTRO_ANEXO',
									),
									array(
										'amos_dobra_anexo_dobra_iden = :anexo_ensa_iden,
										 amos_dobra_anexo_tipo = :anexo_tipo,
										 amos_dobra_anexo_descr = :anexo_descr,
										 amos_dobra_anexo_arqui = :anexo_arqui
										',
										'labo_amos_dobra_anexo_cada',
										'amos_dobra_anexo_cada_iden = :anexo_cada_iden',
									),
									
									self::$RotSql[ 'UpdtRegAnex' ]
								);
							};

							if ( $vEnsaTabe == 'DUREZA' ){
								$UpdtRegAnex = str_replace(
									array(
										':CAMPOS_ANEXO',
										':TABELA_ANEXO',
										':FILTRO_ANEXO',
									),
									array(
										'amos_dure_anexo_dure_iden = :anexo_ensa_iden,
										 amos_dure_anexo_tipo = :anexo_tipo,
										 amos_dure_anexo_descr = :anexo_descr,
										 amos_dure_anexo_arqui = :anexo_arqui
										',
										'labo_amos_dure_anexo_cada',
										'amos_dure_anexo_cada_iden = :anexo_cada_iden',
									),
									
									self::$RotSql[ 'UpdtRegAnex' ]
								);
							};

							if ( $vEnsaTabe == 'CHARPY' ){
								$UpdtRegAnex = str_replace(
									array(
										':CAMPOS_ANEXO',
										':TABELA_ANEXO',
										':FILTRO_ANEXO',
									),
									array(
										'amos_charpy_anexo_charpy_iden = :anexo_ensa_iden,
										 amos_charpy_anexo_tipo = :anexo_tipo,
										 amos_charpy_anexo_descr = :anexo_descr,
										 amos_charpy_anexo_arqui = :anexo_arqui
										',
										'labo_amos_charpy_anexo_cada',
										'amos_charpy_anexo_cada_iden = :anexo_cada_iden',
									),
									
									self::$RotSql[ 'UpdtRegAnex' ]
								);
							};

							if ( $vEnsaTabe == 'MACROGRAFIA' ){
								$UpdtRegAnex = str_replace(
									array(
										':CAMPOS_ANEXO',
										':TABELA_ANEXO',
										':FILTRO_ANEXO',
									),
									array(
										'amos_macro_anexo_macro_iden = :anexo_ensa_iden,
										 amos_macro_anexo_tipo = :anexo_tipo,
										 amos_macro_anexo_descr = :anexo_descr,
										 amos_macro_anexo_arqui = :anexo_arqui
										',
										'labo_amos_macro_anexo_cada',
										'amos_macro_anexo_cada_iden = :anexo_cada_iden',
									),
									
									self::$RotSql[ 'UpdtRegAnex' ]
								);
							};

							if ( $vEnsaTabe == 'METALOGRAFIA' ){
								$UpdtRegAnex = str_replace(
									array(
										':CAMPOS_ANEXO',
										':TABELA_ANEXO',
										':FILTRO_ANEXO',
									),
									array(
										'amos_meta_anexo_meta_iden = :anexo_ensa_iden,
										 amos_meta_anexo_tipo = :anexo_tipo,
										 amos_meta_anexo_descr = :anexo_descr,
										 amos_meta_anexo_arqui = :anexo_arqui
										',
										'labo_amos_meta_anexo_cada',
										'amos_meta_anexo_cada_iden = :anexo_cada_iden',
									),
									
									self::$RotSql[ 'UpdtRegAnex' ]
								);
							};

							$Prepara = $vConn->prepare( $UpdtRegAnex );
							$Prepara->bindValue( ':anexo_cada_iden', $Val->anexo_cada_iden );
						};
						
						if (  $Val->anexo_arqui != 'selecione um arquivo' ) {
							$ArqAnexo = str_replace( 
								array( 'Back\Modulos\Comum\Anexos', 'Back/Modulos/Comum/Anexos' ),
								'',
								__DIR__ ).'Anexos/'.$vEnsaTabe.'_'.$vEnsaiIdem.'_'.$Val->anexo_arqui;

							if ( $Val->anexo_tipo == -1 ) {
								if ( $vEnsaTabe == 'ACHATAMENTO' ){
									$DeleRegAnex = str_replace(
										array(
											':TABELA_ANEXO',
											':FILTRO_ANEXO',
										),
										array(
											'labo_amos_achat_anexo_cada',
											'amos_achat_anexo_cada_iden = :anexo_cada_iden',
										),
										
										self::$RotSql[ 'DeleRegAnex' ]
									);
								};
								
								if ( $vEnsaTabe == 'DOBRAMENTO' ){
									$DeleRegAnex = str_replace(
										array(
											':TABELA_ANEXO',
											':FILTRO_ANEXO',
										),
										array(
											'labo_amos_dobra_anexo_cada',
											'amos_dobra_anexo_cada_iden = :anexo_cada_iden',
										),
										
										self::$RotSql[ 'DeleRegAnex' ]
									);
								};

								if ( $vEnsaTabe == 'DUREZA' ){
									$DeleRegAnex = str_replace(
										array(
											':TABELA_ANEXO',
											':FILTRO_ANEXO',
										),
										array(
											'labo_amos_dure_anexo_cada',
											'amos_dure_anexo_cada_iden = :anexo_cada_iden',
										),
										
										self::$RotSql[ 'DeleRegAnex' ]
									);
								};

								if ( $vEnsaTabe == 'CHARPY' ){
									$DeleRegAnex = str_replace(
										array(
											':TABELA_ANEXO',
											':FILTRO_ANEXO',
										),
										array(
											'labo_amos_charpy_anexo_cada',
											'amos_charpy_anexo_cada_iden = :anexo_cada_iden',
										),
										
										self::$RotSql[ 'DeleRegAnex' ]
									);
								};

								if ( $vEnsaTabe == 'MACROGRAFIA' ){
									$DeleRegAnex = str_replace(
										array(
											':TABELA_ANEXO',
											':FILTRO_ANEXO',
										),
										array(
											'labo_amos_macro_anexo_cada',
											'amos_macro_anexo_cada_iden = :anexo_cada_iden',
										),
										
										self::$RotSql[ 'DeleRegAnex' ]
									);
								};

								if ( $vEnsaTabe == 'METALOGRAFIA' ){
									$DeleRegAnex = str_replace(
										array(
											':TABELA_ANEXO',
											':FILTRO_ANEXO',
										),
										array(
											'labo_amos_meta_anexo_cada',
											'amos_meta_anexo_cada_iden = :anexo_cada_iden',
										),
										
										self::$RotSql[ 'DeleRegAnex' ]
									);
								};
								
								$Prepara = $vConn->prepare( $DeleRegAnex );
								$Prepara->bindValue( ':anexo_cada_iden', $Val->anexo_cada_iden );
								
								$Prepara->execute();
								
								if ( file_exists ( $ArqAnexo ) ) {
									unlink( $ArqAnexo );
								};	
							} else {
								$Prepara->bindValue( ':anexo_ensa_iden', $vEnsaiIdem );
								$Prepara->bindValue( ':anexo_tipo', $Val->anexo_tipo );
								$Prepara->bindValue( ':anexo_descr', Core::UpperCase( $Val->anexo_descr ) );
								$Prepara->bindValue( ':anexo_arqui', $Val->anexo_arqui );
			
								$Prepara->execute();
			
								if ( $Val->anexo_arqu64 != '' ){
		
									if ( $Val-> anexo_arqui_ante != '' ){
										if ( $Val->anexo_arqui != $Val->anexo_arqui_ante ){
											$ArqAnteAnexo = str_replace( 
												array( 'Back\Modulos\Comum\Anexos', 'Back/Modulos/Comum/Anexos' ),
												'',
												__DIR__ ).'Anexos/'.$vEnsaTabe.'_'.$vEnsaiIdem.'_'.$Val->anexo_arqui_ante;

											if ( file_exists ( $ArqAnteAnexo ) ) {
												unlink( $ArqAnteAnexo );
											};
										};
									};

									$StrLogBas64 = $Val->anexo_arqu64;
									$StrLogBas64 = explode( ',', $StrLogBas64 ); 
									$StrLogBas64 = str_replace( ' ','+',$StrLogBas64[1] ); 
									$StrLogBas64 = base64_decode( $StrLogBas64 );
								
									if ( file_exists ( $ArqAnexo ) ) {
										unlink( $ArqAnexo );
									};

									file_put_contents( $ArqAnexo, $StrLogBas64 );
								};
							};
						};
					};

					if ( $descricao == 'Inclusão de Anexos' ){
						$Retorno = $vEnsaiIdem.' incluido';
					} else {
						$Retorno = $vEnsaiIdem.' alterado';
					};
						
					$status = 'sucesso';
					$listreg = 'Registro ID '.$Retorno;

					return array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Anexos',
						'status' => $status,
						'descricao' => $descricao,
						'listreg' => $listreg,
					);
				} catch ( PDOException $e ) {
					return array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Anexos',
						'status' => 'invalido',
						'descricao' => 'Manutenção de Anexos com erro </br> '.$e->getMessage(),
						'listreg' => false,
					);
				};
			} else {
				return $vStatSess;
			};
		}

		/**
		 * Recuperar arquivo para donwload.
		 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return integer Ultimo id
		 * @access public
		*/
		public static function GetDonwAnex( $Parametros = array() ){
			$ArqAnexo = str_replace( 
				array( 'Back\Modulos\Comum\Anexos', 'Back/Modulos/Comum/Anexos' ),
				'',
				__DIR__ ).'Anexos/'.$Parametros['anexo_ensa_tabe'].'_'.$Parametros['IdenAnex'].'_'.$Parametros['FileAnexLabe'];
			
			if ( file_exists ( $ArqAnexo ) ) {
				return json_encode( array(
					'sistema' => Core::config( 'system_apelido' ),
					'modulo' => 'Anexos',
					'status' => 'sucesso',
					'descricao' => 'Download de Anexos',
					'listreg' => '../../Anexos/'.$Parametros['anexo_ensa_tabe'].'_'.$Parametros['IdenAnex'].'_'.$Parametros['FileAnexLabe'],
				) );
			} else {
				return json_encode( array(
					'sistema' => Core::config( 'system_apelido' ),
					'modulo' => 'Anexos',
					'status' => 'Invalido',
					'descricao' => 'Download de Anexos com erro </br> Arquivo '.$Parametros['FileAnexLabe'].' não Encontrado',
					'listreg' => null,
				) );
			};
		}
	}
?>