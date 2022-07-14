<?php
	namespace Back\Modulos\Laboratorio\Certificado\Padrao;

	use Back\Core\Core;
	use Back\Modulos\Comum\Anexos\Anexos;
	use Back\Modulos\Comum\Parametros\Parametros;
	use Back\Modulos\Laboratorio\Metalografia\Metalografia;
	use Back\Modulos\Laboratorio\Quimico\Quimico;
	use Back\Modulos\Laboratorio\Tracao\Tracao;
	use Back\Modulos\Laboratorio\Achatamento\Achatamento;
	
	use PDO;
	use PDOException;
	
	/**
 	 * Esta classe contendo rotinas certificados Padrão
 	 * Todas as requisições certificados passam por aqui, são tratadas
 	 * e redirecionadas para o seu destino.
 	 *
 	 * @package    Certipadr
 	 * @author     Alexandre Farinelli Zardo
 	*/
	final class Certipadr {
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
			self::$Conn = Core::Conecta();
		}

		/**
	 	 * Retorna Todos Dados dos Materiais.
	 	 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return mixed
	 	 * @access public
	 	*/
		 public static function GetParaTerc( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {
				return Parametros::GetPara( $Parametros );
			} else {
				return json_encode( $vStatSess );
			};
		}

		/**
		 * Gera Cabeçalho
		 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return cabeçalho
		 * @access public
		*/
		public static function GetCertCabe( $Parametros = array() ){
			$Retorno = json_decode( self::GetParaTerc( $Parametros, 'BACK' ), true )[ 'listreg' ];
		
			$DadaCabe = '';
			if( $Retorno[0]['sis_para_cabe'] != '' ){
				$DadaCabe = $Retorno[0]['sis_para_cabe'];
			};

			$DadaLogo = '';
			if( $Retorno[0]['sis_para_logo'] != '' ){
				$DadaLogo = $Retorno[0]['sist_para_tenant'].'_'.$Retorno[0]['sist_para_empre'].'_'.$Retorno[0]['sis_para_logo'];
			};

			$DadaSelo = '';
			if( $Retorno[0]['sis_para_selo'] != '' ){
				$DadaSelo = $Retorno[0]['sist_para_tenant'].'_'.$Retorno[0]['sist_para_empre'].'_'.$Retorno[0]['sis_para_selo'];
			};
			
			$DadaCabe = str_replace( 
				array(
					'size="1"',
					'size="2"',
					'size="3"',
					'size="4"',
					'size="5"',
					'size="6"',
				),
				array(
					'style="font-size: 8pt"',
					'style="font-size: 10pt"',
					'style="font-size: 12pt"',
					'style="font-size: 14pt"',
					'style="font-size: 18pt"',
					'style="font-size: 26pt"',
				),
				$DadaCabe
			);
			
			$DadaCabe = str_replace( 
				array(
					'</div>',
				),
				array(
					'</div><br>',
				),
				$DadaCabe
			);
			
			$DadaCabe = str_replace( 
				array(
					'div',
				),
				array(
					'span',
				),
				$DadaCabe
			);

			$Cabecalho = '
				<table border="0" style="border-collapse: collapse">
					<tr>
						<td width="100" height="100" align="center"></td>
						<td width="480" style="font-size: 10pt;">
							'.$DadaCabe.'
						</td>
						<td width="100" height="100" align="center"></td>
					</tr>
					<tr>
						<td width="681">
							<hr style="height:1px; border:none; color:#000; background-color:#000"/>
						</td>
					</tr>
				  </table>
			';

			return array( 
				'cabecalho' => $Cabecalho,
				'logo' => $DadaLogo,
				'selo' => $DadaSelo,
			);
		}

		/**
		 * Gera Achatamento Expansão
		 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return achatexpa
		 * @access public
		*/
		public static function GetCertAchaExpa( $Parametros = array() ){
			
			$Retorno = json_decode( Achatamento::GetRegAchatTerce( $Parametros ), true );

			$RetoFoto = json_decode( Anexos::GetTercAnex( array(
				'anexo_ensa_iden' => $Retorno[ 'listreg' ][0][ 'amos_achat_cada_iden' ],
				'anexo_ensa_tabe' => 'ACHATAMENTO',
			) ), true );

			$AnexCami = str_replace( array( 'Back\Modulos\Laboratorio\Certificado\Padrao', 'Back/Modulos/Laboratorio/Certificado/Padrao' ), '', __DIR__ ).'Anexos/ACHATAMENTO_'.$Retorno[ 'listreg' ][0]['amos_achat_cada_iden'].'_';

			$Fotos = '';
			$FotosL = '';
			$FotosR = '';
			$DescrL = '';
			$DescrR = '';
			foreach ( $RetoFoto[ 'listreg' ] as $Lin => $Val ){
				if( $Val[ 'anexo_tipo' ] == 1 ){
					
					if ( $FotosL != '' ){
						$FotosR = '<img src="'.$AnexCami.$Val[ 'anexo_arqui' ].'" style="max-width: 300px !important; height: auto;">';
						$DescrR = $Val[ 'anexo_descr' ];
					} else {
						$FotosL = '<img src="'.$AnexCami.$Val[ 'anexo_arqui' ].'" style="max-width: 300px !important; height: auto;">';
						$DescrL = $Val[ 'anexo_descr' ];
					};

					if ( $FotosL != '' && $FotosR != '' ){
						$Fotos = $Fotos.'
							<tr style="page-break-inside: avoid;">
								<td width="340" style="text-align: center; vertical-align: middle; height: 200px">'.$FotosL.'</td>
								<td width="340" style="text-align: center; vertical-align: middle; height: 200px">'.$FotosR.'</td>
		  					</tr>
							<tr style="page-break-inside: avoid;">
							  <td width="340" style="text-align: center; vertical-align: middle; height: 50px">'.$DescrL.'</td>
							  <td width="340" style="text-align: center; vertical-align: middle; height: 50px">'.$DescrR.'</td>
							</tr>
						';

						$FotosR = '';
						$FotosL = '';
						$DescrL = '';
						$DescrR = '';
					};
				};
			};

			if( count( $RetoFoto[ 'listreg' ] ) % 2 != 0){
				$Fotos = $Fotos.'
					<tr style="page-break-inside: avoid;">
						<td width="340" style="text-align: center; vertical-align: middle; height: 200px">'.$FotosL.'</td>
						<td width="340" style="text-align: center; vertical-align: middle; height: 200px">'.$FotosR.'</td>
		  			</tr>
					<tr style="page-break-inside: avoid;">
					  <td width="340" style="text-align: center; vertical-align: middle; height: 50px">'.$DescrL.'</td>
					  <td width="340" style="text-align: center; vertical-align: middle; height: 50px">'.$DescrR.'</td>
					</tr>
				';
			};

			if( $Fotos == '' ){
				$Fotos = '
					<tr>
						<td width="340" style="text-align: center; vertical-align: middle; height: 250px"></td>
						<td width="340" style="text-align: center; vertical-align: middle; height: 250px"></td>
		  			</tr>
				';
			}

			$amos_achat_cada_fina_data = '';
			if( $Retorno[ 'listreg' ][0]['amos_achat_cada_fina'] == 1){
				$amos_achat_cada_fina_data = date( 'd/m/Y', strtotime( $Retorno[ 'listreg' ][0]['amos_achat_cada_fina_data'] ) );
			};

			$Corpo = '
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 12pt;">
					<tr>
						<td width="340" style="text-align: left; vertical-align: middle;"> <b>Amostra Nº: '.$Retorno[ 'listreg' ][0]['amos_cada_regi'].'</b> </td>
						<td width="340" style="text-align: right; vertical-align: middle;"> <b>Certificado Nº: '.$Retorno[ 'listreg' ][0]['amos_achat_cada_iden'].'</b> </td>
				  	</tr>
				</table>
				<br>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 10pt;">
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Solicitante: </b>'.$Retorno[ 'listreg' ][0]['clie_cada_nome'].'</td>
				  	</tr>
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Amostra: </b>'.$Retorno[ 'listreg' ][0]['amos_cada_descr'].'</td>
				  	</tr>
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Material: </b>'.$Retorno[ 'listreg' ][0]['mate_cada_descr'].'</td>
				  	</tr>
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Fabricante: </b>'.$Retorno[ 'listreg' ][0]['fabr_cada_nome'].'</td>
				  	</tr>
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Ensaio: </b>ANÁLISE ACHATAMENTO / EXPANSÃO </td>
				  	</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 12pt">
					<tr>
						<td width="680" style="text-align: center; vertical-align: middle;"> <b>RESULTADOS</b> </td>
				  	</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 10pt; page-break-inside: avoid;">
					<tr>
						<td><br></td>
					</tr>
					'.$Fotos.'
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 18pt; border-bottom: 2pt solid black; border-top: 2pt solid black; page-break-inside: avoid;">
					<tr>
						<td width="680" style="text-align: center; vertical-align: middle;"> <b> OBSERVAÇÃO ACHATAMENTO / EXPANSÃO</b> </td>
					</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 10pt; page-break-inside: avoid;">
					<tr>
						<td width="680" style="vertical-align: middle; height: 100px;">'.nl2br( $Retorno[ 'listreg' ][0]['amos_achat_cada_obs'] ).'</td>
					</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 18pt; border-bottom: 2pt solid black; border-top: 2pt solid black; page-break-inside: avoid;">
					<tr>
						<td width="680" style="text-align: center; vertical-align: middle;"> <b> CONCLUSÃO / OBSERVAÇÃO </b> </td>
					</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 10pt; page-break-inside: avoid;">
					<tr>
						<td width="680" style="vertical-align: middle; height: 184px;">'.nl2br( $Retorno[ 'listreg' ][0]['amos_cada_concl_livre'] ).'</td>
					</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 12pt; border-bottom: 2pt solid black; border-top: 2pt solid black; page-break-inside: avoid;">
					<tr>
						<td width="200" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b>Data Recepção</b> </td>
						<td width="200" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b>Data Conclusão</b> </td>
						<td width="280" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b></b> </td>
					</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 12pt; border-bottom: 2pt solid black; border-top: 2pt solid black; page-break-inside: avoid;">
					<tr>
						<td width="200" style="text-align: center; vertical-align: middle; height: 55px"> <br><br>'.date( 'd/m/Y', strtotime( $Retorno[ 'listreg' ][0]['amos_cada_emis'] ) ).' </td>
						<td width="200" style="text-align: center; vertical-align: middle; height: 55px"> <br><br>'.$amos_achat_cada_fina_data.' </td>
						<td width="280" style="text-align: center; vertical-align: middle; height: 55px"> <br><br> </td>
					</tr>
				</table>
			';

			return array(
				'sistema' => Core::config( 'system_apelido' ),
				'modulo' => 'Carti_Achat_Expan',
				'status' => $Retorno[ 'status' ],
				'descricao' => 'Resultado Certificado Achatamento / Expansão',
				'listreg' => $Corpo,
			);
		}

		/**
		 * Gera Metalografia
		 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return metalografia
		 * @access public
		*/
		public static function GetCertMeta( $Parametros = array() ){
			
			$Retorno = json_decode( Metalografia::GetRegMetaTerce( $Parametros ), true );

			$RetoFoto = json_decode( Anexos::GetTercAnex( array(
				'anexo_ensa_iden' => $Retorno[ 'listreg' ][0][ 'amos_meta_cada_iden' ],
				'anexo_ensa_tabe' => 'METALOGRAFIA',
			) ), true );

			$AnexCami = str_replace( array( 'Back\Modulos\Laboratorio\Certificado\Padrao', 'Back/Modulos/Laboratorio/Certificado/Padrao' ), '', __DIR__ ).'Anexos/METALOGRAFIA_'.$Retorno[ 'listreg' ][0]['amos_meta_cada_iden'].'_';

			$Fotos = '';
			$FotosL = '';
			$FotosR = '';
			$DescrL = '';
			$DescrR = '';
			foreach ( $RetoFoto[ 'listreg' ] as $Lin => $Val ){
				if( $Val[ 'anexo_tipo' ] == 1 ){
					
					if ( $FotosL != '' ){
						$FotosR = '<img src="'.$AnexCami.$Val[ 'anexo_arqui' ].'" style="max-width: 300px !important; height: auto;">';
						$DescrR = $Val[ 'anexo_descr' ];
					} else {
						$FotosL = '<img src="'.$AnexCami.$Val[ 'anexo_arqui' ].'" style="max-width: 300px !important; height: auto;">';
						$DescrL = $Val[ 'anexo_descr' ];
					};

					if ( $FotosL != '' && $FotosR != '' ){
						$Fotos = $Fotos.'
							<tr style="page-break-inside: avoid;">
								<td width="340" style="text-align: center; vertical-align: middle; height: 200px">'.$FotosL.'</td>
								<td width="340" style="text-align: center; vertical-align: middle; height: 200px">'.$FotosR.'</td>
		  					</tr>
							<tr style="page-break-inside: avoid;">
							  <td width="340" style="text-align: center; vertical-align: middle; height: 50px">'.$DescrL.'</td>
							  <td width="340" style="text-align: center; vertical-align: middle; height: 50px">'.$DescrR.'</td>
							</tr>
						';

						$FotosR = '';
						$FotosL = '';
						$DescrL = '';
						$DescrR = '';
					};
				};
			};

			if( count( $RetoFoto[ 'listreg' ] ) % 2 != 0){
				$Fotos = $Fotos.'
					<tr style="page-break-inside: avoid;">
						<td width="340" style="text-align: center; vertical-align: middle; height: 200px">'.$FotosL.'</td>
						<td width="340" style="text-align: center; vertical-align: middle; height: 200px">'.$FotosR.'</td>
		  			</tr>
					<tr style="page-break-inside: avoid;">
					  <td width="340" style="text-align: center; vertical-align: middle; height: 50px">'.$DescrL.'</td>
					  <td width="340" style="text-align: center; vertical-align: middle; height: 50px">'.$DescrR.'</td>
					</tr>
				';
			};

			if( $Fotos == '' ){
				$Fotos = '
					<tr>
						<td width="340" style="text-align: center; vertical-align: middle; height: 250px"></td>
						<td width="340" style="text-align: center; vertical-align: middle; height: 250px"></td>
		  			</tr>
				';
			}

			$amos_meta_cada_fina_data = '';
			if( $Retorno[ 'listreg' ][0]['amos_meta_cada_fina'] == 1){
				$amos_meta_cada_fina_data = date( 'd/m/Y', strtotime( $Retorno[ 'listreg' ][0]['amos_meta_cada_fina_data'] ) );
			};

			$Corpo = '
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 12pt;">
					<tr>
						<td width="340" style="text-align: left; vertical-align: middle;"> <b>Amostra Nº: '.$Retorno[ 'listreg' ][0]['amos_cada_regi'].'</b> </td>
						<td width="340" style="text-align: right; vertical-align: middle;"> <b>Certificado Nº: '.$Retorno[ 'listreg' ][0]['amos_meta_cada_iden'].'</b> </td>
				  	</tr>
				</table>
				<br>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 10pt;">
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Solicitante: </b>'.$Retorno[ 'listreg' ][0]['clie_cada_nome'].'</td>
				  	</tr>
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Amostra: </b>'.$Retorno[ 'listreg' ][0]['amos_cada_descr'].'</td>
				  	</tr>
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Material: </b>'.$Retorno[ 'listreg' ][0]['mate_cada_descr'].'</td>
				  	</tr>
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Fabricante: </b>'.$Retorno[ 'listreg' ][0]['fabr_cada_nome'].'</td>
				  	</tr>
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Ensaio: </b>ANÁLISE METALOGRAFICA </td>
				  	</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 12pt">
					<tr>
						<td width="680" style="text-align: center; vertical-align: middle;"> <b>RESULTADOS</b> </td>
				  	</tr>
				</table>
				<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt;">
					<tr>
						<td width="680" style="text-align: right; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b>Reagente Quimico: </b>'.$Retorno[ 'listreg' ][0]['amos_meta_cada_reag'].' </td>
				  	</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 10pt; page-break-inside: avoid;">
					<tr>
						<td><br></td>
					</tr>
					'.$Fotos.'
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 10pt; border-bottom: 2pt solid black; border-top: 2pt solid black; page-break-inside: avoid;">
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Matriz: </b>'.$Retorno[ 'listreg' ][0]['amos_meta_cada_matriz'].' </td>
					</tr>
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Tamanho de Grãos: </b>'.$Retorno[ 'listreg' ][0]['amos_meta_cada_graos'].' </td>
					</tr>
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Particularidades: </b>'.$Retorno[ 'listreg' ][0]['amos_meta_cada_parti'].' </td>
					</tr>
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Características: </b>'.$Retorno[ 'listreg' ][0]['amos_meta_cada_caract'].' </td>
					</tr>
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Observação: </b>'.nl2br( $Retorno[ 'listreg' ][0]['amos_meta_cada_obs'] ).' </td>
					</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 18pt; border-bottom: 2pt solid black; border-top: 2pt solid black; page-break-inside: avoid;">
					<tr>
						<td width="680" style="text-align: center; vertical-align: middle;"> <b> CONCLUSÃO / OBSERVAÇÃO </b> </td>
					</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 10pt; page-break-inside: avoid;">
					<tr>
						<td width="680" style="vertical-align: middle; height: 194px;">'.nl2br( $Retorno[ 'listreg' ][0]['amos_cada_concl_livre'] ).'</td>
					</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 12pt; border-bottom: 2pt solid black; border-top: 2pt solid black; page-break-inside: avoid;">
					<tr>
						<td width="200" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b>Data Recepção</b> </td>
						<td width="200" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b>Data Conclusão</b> </td>
						<td width="280" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b></b> </td>
					</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 12pt; border-bottom: 2pt solid black; border-top: 2pt solid black; page-break-inside: avoid;">
					<tr>
						<td width="200" style="text-align: center; vertical-align: middle; height: 55px"> <br><br>'.date( 'd/m/Y', strtotime( $Retorno[ 'listreg' ][0]['amos_cada_emis'] ) ).' </td>
						<td width="200" style="text-align: center; vertical-align: middle; height: 55px"> <br><br>'.$amos_meta_cada_fina_data.' </td>
						<td width="280" style="text-align: center; vertical-align: middle; height: 55px"> <br><br> </td>
					</tr>
				</table>
			';

			return array(
				'sistema' => Core::config( 'system_apelido' ),
				'modulo' => 'Carti_Metalo',
				'status' => $Retorno[ 'status' ],
				'descricao' => 'Resultado Certificado Metalografia',
				'listreg' => $Corpo,
			);
		}
		
		/**
		 * Gera Quimica
		 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return metalografia
		 * @access public
		*/
		public static function GetCertQuimi( $Parametros = array() ){
			
			$Retorno = json_decode( Quimico::GetRegQuimiTerce( $Parametros ), true );

			/*$RetoFoto = json_decode( Anexos::GetTercAnex( array(
				'anexo_ensa_iden' => $Retorno[ 'listreg' ][0][ 'amos_meta_cada_iden' ],
				'anexo_ensa_tabe' => 'METALOGRAFIA',
			) ), true );

			$AnexCami = str_replace( array( 'Back\Modulos\Laboratorio\Certificado\Padrao', 'Back/Modulos/Laboratorio/Certificado/Padrao' ), '', __DIR__ ).'Anexos/METALOGRAFIA_'.$Retorno[ 'listreg' ][0]['amos_meta_cada_iden'].'_';

			$Fotos = '';
			$FotosL = '';
			$FotosR = '';
			$DescrL = '';
			$DescrR = '';
			foreach ( $RetoFoto[ 'listreg' ] as $Lin => $Val ){
				if( $Val[ 'anexo_tipo' ] == 1 ){
					
					if ( $FotosL != '' ){
						$FotosR = '<img src="'.$AnexCami.$Val[ 'anexo_arqui' ].'" style="max-width: 300px !important; height: auto;">';
						$DescrR = $Val[ 'anexo_descr' ];
					} else {
						$FotosL = '<img src="'.$AnexCami.$Val[ 'anexo_arqui' ].'" style="max-width: 300px !important; height: auto;">';
						$DescrL = $Val[ 'anexo_descr' ];
					};

					if ( $FotosL != '' && $FotosR != '' ){
						$Fotos = $Fotos.'
							<tr style="page-break-inside: avoid;">
								<td width="340" style="text-align: center; vertical-align: middle; height: 200px">'.$FotosL.'</td>
								<td width="340" style="text-align: center; vertical-align: middle; height: 200px">'.$FotosR.'</td>
		  					</tr>
							<tr style="page-break-inside: avoid;">
							  <td width="340" style="text-align: center; vertical-align: middle; height: 50px">'.$DescrL.'</td>
							  <td width="340" style="text-align: center; vertical-align: middle; height: 50px">'.$DescrR.'</td>
							</tr>
						';

						$FotosR = '';
						$FotosL = '';
						$DescrL = '';
						$DescrR = '';
					};
				};
			};

			if( count( $RetoFoto[ 'listreg' ] ) % 2 != 0){
				$Fotos = $Fotos.'
					<tr style="page-break-inside: avoid;">
						<td width="340" style="text-align: center; vertical-align: middle; height: 200px">'.$FotosL.'</td>
						<td width="340" style="text-align: center; vertical-align: middle; height: 200px">'.$FotosR.'</td>
		  			</tr>
					<tr style="page-break-inside: avoid;">
					  <td width="340" style="text-align: center; vertical-align: middle; height: 50px">'.$DescrL.'</td>
					  <td width="340" style="text-align: center; vertical-align: middle; height: 50px">'.$DescrR.'</td>
					</tr>
				';
			};

			if( $Fotos == '' ){
				$Fotos = '
					<tr>
						<td width="340" style="text-align: center; vertical-align: middle; height: 250px"></td>
						<td width="340" style="text-align: center; vertical-align: middle; height: 250px"></td>
		  			</tr>
				';
			}*/

			$amos_quimi_cada_fina_data = '';
			if( $Retorno[ 'listreg' ][0]['amos_quimi_cada_fina'] == 1){
				$amos_quimi_cada_fina_data = date( 'd/m/Y', strtotime( $Retorno[ 'listreg' ][0]['amos_quimi_cada_fina_data'] ) );
			};

			$Corpo = '
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 12pt;">
					<tr>
						<td width="340" style="text-align: left; vertical-align: middle;"> <b>Amostra Nº: '.$Retorno[ 'listreg' ][0]['amos_cada_regi'].'</b> </td>
						<td width="340" style="text-align: right; vertical-align: middle;"> <b>Certificado Nº: '.$Retorno[ 'listreg' ][0]['amos_quimi_cada_iden'].'</b> </td>
				  	</tr>
				</table>
				<br>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 10pt;">
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Solicitante: </b>'.$Retorno[ 'listreg' ][0]['clie_cada_nome'].'</td>
				  	</tr>
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Amostra: </b>'.$Retorno[ 'listreg' ][0]['amos_cada_descr'].'</td>
				  	</tr>
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Material: </b>'.$Retorno[ 'listreg' ][0]['mate_cada_descr'].'</td>
				  	</tr>
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Fabricante: </b>'.$Retorno[ 'listreg' ][0]['fabr_cada_nome'].'</td>
				  	</tr>
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Ensaio: </b>ANÁLISE QUIMICA </td>
				  	</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 12pt">
					<tr>
						<td width="680" style="text-align: center; vertical-align: middle;"> <b>RESULTADOS</b> </td>
				  	</tr>
				</table>
				<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt; border-bottom: 2pt solid black; border-top: 2pt solid black; page-break-inside: avoid;">
					<tr>
						<td width="180" colspan="2" style="vertical-align: middle; background-color: rgb(240, 240, 240)"> <b>Composição (% peso) </b> </td>
						<td width="50" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b> C </b> </td>
						<td width="50" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b> Si </b> </td>
						<td width="50" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b> Mn </b> </td>
						<td width="50" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b> P </b> </td>
						<td width="50" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b> S </b> </td>
						<td width="50" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b> Cr </b> </td>
						<td width="50" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b> Ni </b> </td>
						<td width="50" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b> Mo </b> </td>
						<td width="50" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b> Al </b> </td>
						<td width="50" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b> Cu </b> </td>
					</tr>
					<tr>
						<td width="130" rowspan="2" style="vertical-align: middle; "> <b>Especificado </b> </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> <b> (min.) </b> </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['amos_quimi_cada_espe_C'] )[0].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['amos_quimi_cada_espe_Si'] )[0].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['amos_quimi_cada_espe_Mn'] )[0].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['amos_quimi_cada_espe_P'] )[0].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['amos_quimi_cada_espe_S'] )[0].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['amos_quimi_cada_espe_Cr'] )[0].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['amos_quimi_cada_espe_Ni'] )[0].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['amos_quimi_cada_espe_Mo'] )[0].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['amos_quimi_cada_espe_Al'] )[0].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['amos_quimi_cada_espe_Cu'] )[0].' </td>
					</tr>
					<tr>
						<td width="50" style="text-align: center; vertical-align: middle; "> <b> (max.) </b> </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['amos_quimi_cada_espe_C'] )[1].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['amos_quimi_cada_espe_Si'] )[1].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['amos_quimi_cada_espe_Mn'] )[1].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['amos_quimi_cada_espe_P'] )[1].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['amos_quimi_cada_espe_S'] )[1].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['amos_quimi_cada_espe_Cr'] )[1].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['amos_quimi_cada_espe_Ni'] )[1].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['amos_quimi_cada_espe_Mo'] )[1].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['amos_quimi_cada_espe_Al'] )[1].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['amos_quimi_cada_espe_Cu'] )[1].' </td>
					</tr>
					<tr>
						<td width="180" colspan="2" style="vertical-align: middle; "> <b>Obtido</b> </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.$Retorno[ 'listreg' ][0]['amos_quimi_cada_obti_C'].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.$Retorno[ 'listreg' ][0]['amos_quimi_cada_obti_Si'].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.$Retorno[ 'listreg' ][0]['amos_quimi_cada_obti_Mn'].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.$Retorno[ 'listreg' ][0]['amos_quimi_cada_obti_P'].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.$Retorno[ 'listreg' ][0]['amos_quimi_cada_obti_S'].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.$Retorno[ 'listreg' ][0]['amos_quimi_cada_obti_Cr'].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.$Retorno[ 'listreg' ][0]['amos_quimi_cada_obti_Ni'].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.$Retorno[ 'listreg' ][0]['amos_quimi_cada_obti_Mo'].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.$Retorno[ 'listreg' ][0]['amos_quimi_cada_obti_Al'].' </td>
						<td width="50" style="text-align: center; vertical-align: middle; "> '.$Retorno[ 'listreg' ][0]['amos_quimi_cada_obti_Cu'].' </td>
					</tr>
				</table>	
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 10pt; border-bottom: 2pt solid black; page-break-inside: avoid;">		
					<tr>
						<td width="180" style="vertical-align: middle; height: 300px;"></td>
					</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 18pt; border-bottom: 2pt solid black; border-top: 2pt solid black; page-break-inside: avoid;">
					<tr>
						<td width="680" style="text-align: center; vertical-align: middle;"> <b> CONCLUSÃO / OBSERVAÇÃO </b> </td>
					</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 10pt; page-break-inside: avoid;">
					<tr>
						<td width="680" style="vertical-align: middle; height: 215px;">'.nl2br( $Retorno[ 'listreg' ][0]['amos_cada_concl_livre'] ).'</td>
					</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 12pt; border-bottom: 2pt solid black; border-top: 2pt solid black; page-break-inside: avoid;">
					<tr>
						<td width="200" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b>Data Recepção</b> </td>
						<td width="200" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b>Data Conclusão</b> </td>
						<td width="280" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b></b> </td>
					</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 12pt; border-bottom: 2pt solid black; border-top: 2pt solid black; page-break-inside: avoid;">
					<tr>
						<td width="200" style="text-align: center; vertical-align: middle; height: 55px"> <br><br>'.date( 'd/m/Y', strtotime( $Retorno[ 'listreg' ][0]['amos_cada_emis'] ) ).' </td>
						<td width="200" style="text-align: center; vertical-align: middle; height: 55px"> <br><br>'.$amos_quimi_cada_fina_data.' </td>
						<td width="280" style="text-align: center; vertical-align: middle; height: 55px"> <br><br> </td>
					</tr>
				</table>
			';

			return array(
				'sistema' => Core::config( 'system_apelido' ),
				'modulo' => 'Carti_Metalo',
				'status' => $Retorno[ 'status' ],
				'descricao' => 'Resultado Certificado Metalografia',
				'listreg' => $Corpo,
			);
		}

		/**
		 * Gera Tração
		 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return metalografia
		 * @access public
		*/
		public static function GetCertTrac( $Parametros = array() ){
			
			$Retorno = json_decode( Tracao::GetRegTracTerce( $Parametros ), true );

			/*$RetoFoto = json_decode( Anexos::GetTercAnex( array(
				'anexo_ensa_iden' => $Retorno[ 'listreg' ][0][ 'amos_meta_cada_iden' ],
				'anexo_ensa_tabe' => 'METALOGRAFIA',
			) ), true );

			$AnexCami = str_replace( array( 'Back\Modulos\Laboratorio\Certificado\Padrao', 'Back/Modulos/Laboratorio/Certificado/Padrao' ), '', __DIR__ ).'Anexos/METALOGRAFIA_'.$Retorno[ 'listreg' ][0]['amos_meta_cada_iden'].'_';

			$Fotos = '';
			$FotosL = '';
			$FotosR = '';
			$DescrL = '';
			$DescrR = '';
			foreach ( $RetoFoto[ 'listreg' ] as $Lin => $Val ){
				if( $Val[ 'anexo_tipo' ] == 1 ){
					
					if ( $FotosL != '' ){
						$FotosR = '<img src="'.$AnexCami.$Val[ 'anexo_arqui' ].'" style="max-width: 300px !important; height: auto;">';
						$DescrR = $Val[ 'anexo_descr' ];
					} else {
						$FotosL = '<img src="'.$AnexCami.$Val[ 'anexo_arqui' ].'" style="max-width: 300px !important; height: auto;">';
						$DescrL = $Val[ 'anexo_descr' ];
					};

					if ( $FotosL != '' && $FotosR != '' ){
						$Fotos = $Fotos.'
							<tr style="page-break-inside: avoid;">
								<td width="340" style="text-align: center; vertical-align: middle; height: 200px">'.$FotosL.'</td>
								<td width="340" style="text-align: center; vertical-align: middle; height: 200px">'.$FotosR.'</td>
		  					</tr>
							<tr style="page-break-inside: avoid;">
							  <td width="340" style="text-align: center; vertical-align: middle; height: 50px">'.$DescrL.'</td>
							  <td width="340" style="text-align: center; vertical-align: middle; height: 50px">'.$DescrR.'</td>
							</tr>
						';

						$FotosR = '';
						$FotosL = '';
						$DescrL = '';
						$DescrR = '';
					};
				};
			};

			if( count( $RetoFoto[ 'listreg' ] ) % 2 != 0){
				$Fotos = $Fotos.'
					<tr style="page-break-inside: avoid;">
						<td width="340" style="text-align: center; vertical-align: middle; height: 200px">'.$FotosL.'</td>
						<td width="340" style="text-align: center; vertical-align: middle; height: 200px">'.$FotosR.'</td>
		  			</tr>
					<tr style="page-break-inside: avoid;">
					  <td width="340" style="text-align: center; vertical-align: middle; height: 50px">'.$DescrL.'</td>
					  <td width="340" style="text-align: center; vertical-align: middle; height: 50px">'.$DescrR.'</td>
					</tr>
				';
			};

			if( $Fotos == '' ){
				$Fotos = '
					<tr>
						<td width="340" style="text-align: center; vertical-align: middle; height: 250px"></td>
						<td width="340" style="text-align: center; vertical-align: middle; height: 250px"></td>
		  			</tr>
				';
			}*/

			$amos_tracao_cada_fina_data = '';
			if( $Retorno[ 'listreg' ][0]['amos_tracao_cada_fina'] == 1){
				$amos_tracao_cada_fina_data = date( 'd/m/Y', strtotime( $Retorno[ 'listreg' ][0]['amos_tracao_cada_fina_data'] ) );
			};

			$Corpo = '
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 12pt;">
					<tr>
						<td width="340" style="text-align: left; vertical-align: middle;"> <b>Amostra Nº: '.$Retorno[ 'listreg' ][0]['amos_cada_regi'].'</b> </td>
						<td width="340" style="text-align: right; vertical-align: middle;"> <b>Certificado Nº: '.$Retorno[ 'listreg' ][0]['amos_tracao_cada_iden'].'</b> </td>
				  	</tr>
				</table>
				<br>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 10pt;">
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Solicitante: </b>'.$Retorno[ 'listreg' ][0]['clie_cada_nome'].'</td>
				  	</tr>
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Amostra: </b>'.$Retorno[ 'listreg' ][0]['amos_cada_descr'].'</td>
				  	</tr>
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Material: </b>'.$Retorno[ 'listreg' ][0]['mate_cada_descr'].'</td>
				  	</tr>
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Fabricante: </b>'.$Retorno[ 'listreg' ][0]['fabr_cada_nome'].'</td>
				  	</tr>
					<tr>
						<td width="680" style="vertical-align: middle;"> <b>Ensaio: </b>ENSAIO DE TRAÇÃO</td>
				  	</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 12pt">
					<tr>
						<td width="680" style="text-align: center; vertical-align: middle;"> <b>RESULTADOS</b> </td>
				  	</tr>
				</table>
				<table border="1" cellpadding="1" style="border-collapse: collapse; font-size: 10pt; border-bottom: 2pt solid black; border-top: 2pt solid black; page-break-inside: avoid;">
					<tr>
						<td width="280" colspan="2" style="vertical-align: middle; background-color: rgb(240, 240, 240)"> <b>Propriedades Mecânicas</b> </td>
						<td width="100" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b>Limite Resistencia <br> (MPa)</b> </td>
						<td width="100" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b>Limite Escoamento <br> (MPa)</b> </td>
						<td width="100" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b>Alongamento (%)</b> </td>
						<td width="100" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b>Redução Área (%)</b> </td>
					</tr>
					<tr>
						<td width="200" rowspan="2" style="vertical-align: middle; "> <b>Especificado </b> </td>
						<td width="80" style="text-align: center; vertical-align: middle; "> <b> (min.) </b> </td>
						<td width="100" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['mate_cada_limi_resi'] )[0].' </td>
						<td width="100" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['mate_cada_limi_esco'] )[0].' </td>
						<td width="100" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['mate_cada_along'] )[0].' </td>
						<td width="100" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['mate_cada_redu_area'] )[0].' </td>
					</tr>
					<tr>
						<td width="80" style="text-align: center; vertical-align: middle; "> <b> (max.) </b> </td>
						<td width="100" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['mate_cada_limi_resi'] )[1].' </td>
						<td width="100" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['mate_cada_limi_esco'] )[1].' </td>
						<td width="100" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['mate_cada_along'] )[1].' </td>
						<td width="100" style="text-align: center; vertical-align: middle; "> '.explode( '-', $Retorno[ 'listreg' ][0]['mate_cada_redu_area'] )[1].' </td>
					</tr>
					<tr>
						<td width="280" colspan="2" style="vertical-align: middle; "> <b>Obtido</b> </td>
						<td width="100" style="text-align: center; vertical-align: middle; "> '.$Retorno[ 'listreg' ][0]['amos_tracao_cada_limi_resist'].' </td>
						<td width="100" style="text-align: center; vertical-align: middle; "> '.$Retorno[ 'listreg' ][0]['amos_tracao_cada_limi_escoa'].' </td>
						<td width="100" style="text-align: center; vertical-align: middle; "> '.$Retorno[ 'listreg' ][0]['amos_tracao_cada_along'].' </td>
						<td width="100" style="text-align: center; vertical-align: middle; "> '.$Retorno[ 'listreg' ][0]['amos_tracao_cada_redu_area'].' </td>
					</tr>
				</table>	
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 10pt; border-bottom: 2pt solid black; page-break-inside: avoid;">		
					<tr>
						<td width="680" style="vertical-align: middle; height: 268px;"></td>
					</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 18pt; border-bottom: 2pt solid black; border-top: 2pt solid black; page-break-inside: avoid;">
					<tr>
						<td width="680" style="text-align: center; vertical-align: middle;"> <b> CONCLUSÃO / OBSERVAÇÃO </b> </td>
					</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 10pt; page-break-inside: avoid;">
					<tr>
						<td width="680" style="vertical-align: middle; height: 215px;">'.nl2br( $Retorno[ 'listreg' ][0]['amos_cada_concl_livre'] ).'</td>
					</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 12pt; border-bottom: 2pt solid black; border-top: 2pt solid black; page-break-inside: avoid;">
					<tr>
						<td width="200" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b>Data Recepção</b> </td>
						<td width="200" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b>Data Conclusão</b> </td>
						<td width="280" style="text-align: center; vertical-align: middle; background-color: rgb(240, 240, 240)"> <b></b> </td>
					</tr>
				</table>
				<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 12pt; border-bottom: 2pt solid black; border-top: 2pt solid black; page-break-inside: avoid;">
					<tr>
						<td width="200" style="text-align: center; vertical-align: middle; height: 55px"> <br><br>'.date( 'd/m/Y', strtotime( $Retorno[ 'listreg' ][0]['amos_cada_emis'] ) ).' </td>
						<td width="200" style="text-align: center; vertical-align: middle; height: 55px"> <br><br>'.$amos_tracao_cada_fina_data.' </td>
						<td width="280" style="text-align: center; vertical-align: middle; height: 55px"> <br><br> </td>
					</tr>
				</table>
			';

			return array(
				'sistema' => Core::config( 'system_apelido' ),
				'modulo' => 'Carti_Metalo',
				'status' => $Retorno[ 'status' ],
				'descricao' => 'Resultado Certificado Metalografia',
				'listreg' => $Corpo,
			);
		}
		
		/**
		 * Gera PDF a Certificado cadastrada
		 *
		 * @param Parametros array contendo os dados do filtro
		 * 
		 * @return arquivo
		 * @access public
		*/
		public static function SetImpreCert( $Parametros = array() ){
			$vStatSess = json_decode( Core::Sessao()::Chk( 'usua_cada_iden' ), true );
			if ( $vStatSess[ 'status' ] == 'aberto' ) {

				try{
					$Cabecalho = self::GetCertCabe( $Parametros );

					Core::$CabeSelo = '';
					if( $Cabecalho[ 'selo' ] != '' ){
						Core::$CabeSelo = str_replace( array( 'Back\Modulos\Laboratorio\Certificado\Padrao', 'Back/Modulos/Laboratorio/Certificado/Padrao' ), '', __DIR__ ).'Imagem/'.$Cabecalho[ 'selo' ];
					};

					$CabeLogo = '';
					if( $Cabecalho[ 'logo' ] != '' ){
						$CabeLogo = str_replace( array( 'Back\Modulos\Laboratorio\Certificado\Padrao', 'Back/Modulos/Laboratorio/Certificado/Padrao' ), '', __DIR__ ).'Imagem/'.$Cabecalho[ 'logo' ];
					};

					$Corpo = '';
					if ( $Parametros[ 'amos_cada_cert' ] == 'ACHAT' || $Parametros[ 'amos_cada_cert' ] == 'TODOS' ){
						$Corpo = $Corpo.self::GetCertAchaExpa( $Parametros )[ 'listreg' ];
					};

					if ( $Parametros[ 'amos_cada_cert' ] == 'TODOS' ){
						$Corpo = $Corpo.'
							<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 12pt; page-break-before: always; page-break-inside: avoid;">
							</table>
						';
					};

					if ( $Parametros[ 'amos_cada_cert' ] == 'METALO' || $Parametros[ 'amos_cada_cert' ] == 'TODOS' ){
						$Corpo = $Corpo.self::GetCertMeta( $Parametros )[ 'listreg' ];
					};

					if ( $Parametros[ 'amos_cada_cert' ] == 'TODOS' ){
						$Corpo = $Corpo.'
							<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 12pt; page-break-before: always; page-break-inside: avoid;">
							</table>
						';
					};

					if ( $Parametros[ 'amos_cada_cert' ] == 'QUIMI' || $Parametros[ 'amos_cada_cert' ] == 'TODOS' ){
						$Corpo = $Corpo.self::GetCertQuimi( $Parametros )[ 'listreg' ];
					};

					if ( $Parametros[ 'amos_cada_cert' ] == 'TODOS' ){
						$Corpo = $Corpo.'
							<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 12pt; page-break-before: always; page-break-inside: avoid;">
							</table>
						';
					};

					if ( $Parametros[ 'amos_cada_cert' ] == 'TRACAO' || $Parametros[ 'amos_cada_cert' ] == 'TODOS' ){
						$Corpo = $Corpo.self::GetCertTrac( $Parametros )[ 'listreg' ];
					};

					if ( $Parametros[ 'amos_cada_cert' ] == 'TODOS' ){
						$Corpo = $Corpo.'
							<table border="0" cellpadding="1" style="border-collapse: collapse; font-size: 12pt; page-break-before: always; page-break-inside: avoid;">
							</table>
						';
					};

					$Retorno = Core::SetGeraPdf(
						$Cabecalho[ 'cabecalho' ],
						$Corpo,
						$CabeLogo,
						'P',
						'SIMPLES',
						array( 10, 40, 10, 5 )
					);
					
					unset( $Core );
					
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Certificado',
						'status' => 'sucesso',
						'descricao' => 'Resultado Pesquisa Certificado',
						'listreg' => $Retorno,
					));

				} catch ( PDOException $e ) {
					return json_encode( array(
						'sistema' => Core::config( 'system_apelido' ),
						'modulo' => 'Certificado',
						'status' => 'invalido',
						'descricao' => 'Pesquisa Certificado com erro </br> '.$e->getMessage(),
						'listreg' => false,
					));
				}

			} else {
				return json_encode( $vStatSess );
			};	
		}
	}
?>