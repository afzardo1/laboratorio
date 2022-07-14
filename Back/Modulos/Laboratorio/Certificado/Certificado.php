<?php
	namespace Back\Modulos\Laboratorio\Certificado;

	use Back\Core\Core;
	use Back\Modulos\Comum\Tenant\Tenant;
	use Back\Modulos\Laboratorio\Certificado\Padrao\Certipadr;
	use Back\Modulos\Laboratorio\Certificado\Personalizado\Certificado_QUALY;

	use PDO;
	use PDOException;
	
	/**
 	 * Esta classe contendo rotinas certificados
 	 * Todas as requisições certificados passam por aqui, são tratadas
 	 * e redirecionadas para o seu destino.
 	 *
 	 * @package    Certificado
 	 * @author     Alexandre Farinelli Zardo
 	*/
	final class Certificado {
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
				
				$vCertiPerso = json_decode( Tenant::GetRegTenanCertiPerso( $Parametros ), true );
				if ( $vCertiPerso[ 'status' ] == 'sucesso') {
					
					if( isset( $vCertiPerso[ 'listreg' ][0][ 'tenant_cada_perso_certi' ] ) ){
						
						if( $vCertiPerso[ 'listreg' ][0][ 'tenant_cada_perso_certi' ] == 0 ) {
							return Certipadr::SetImpreCert( $Parametros );
						} else if( $vCertiPerso[ 'listreg' ][0][ 'tenant_cada_perso_certi' ] == 1 ) {
							if ( str_replace( array( '.', ',', '-', '/' ), array( '', '', '', '' ), $vCertiPerso[ 'listreg' ][0][ 'tenant_cada_docu' ] ) == '13004274000109' ){
								return Certificado_QUALY::SetImpreCert( $Parametros );
							} else if ( str_replace( array( '.', ',', '-', '/' ), array( '', '', '', '' ), $vCertiPerso[ 'listreg' ][0][ 'tenant_cada_docu' ] ) == '0000000000' ){
								return Certificado_QUALY::SetImpreCert( $Parametros );
							}
						}

					} else {
						return Certipadr::SetImpreCert( $Parametros );
					}
				} else {
					return json_encode( $vCertiPerso );
				}

			} else {
				return json_encode( $vStatSess );
			};
		}
	}
?>