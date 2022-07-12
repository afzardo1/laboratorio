/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from './Core.class.js';

/**
 * Esta classe e responsavel pelos Parâmetros
 * do sistema
 *
 * @package    Parametros
 * @author     Alexandre Farinelli Zardo
*/
export default class Parametros {
	/**
	 * Inicia Tabela com os dados 
	 *
	 * @param  vTabela - Id Tabela que sera implementada
	 * @param  vFiltros - Array contendo os filtros
	 * @param  vResp - Calback,
	 * @return Calback
	 * @access public
	*/
	static GetTablePara( vTabela, vFiltros, vResp ) {
		Core.SetAjax(
			vFiltros,
			'../../Comum/Parametros/GetPara/', function( vRespAjax ){
				$( '#LabeLogoPara' ).html( 'Selecione um Arquivo' );
				$( '#LabeSeloPara' ).html( 'Selecione um Arquivo' );
				if ( ( vRespAjax.status == 'sucesso' ) && ( vRespAjax.registros != '' ) ){
					$( '#IdenPara' ).val( vRespAjax.registros[0].sist_para_iden );
					if( vRespAjax.registros[0].sis_para_logo != '' ){
						$( '#LabeLogoPara' ).html( vRespAjax.registros[0].sis_para_logo );
					};
					if( vRespAjax.registros[0].sis_para_selo != '' ){
						$( '#LabeSeloPara' ).html( vRespAjax.registros[0].sis_para_selo );
					};
					$( '#SmtpPara' ).val( vRespAjax.registros[0].sist_para_smtp );
					$( '#PortSmtpPara' ).val( vRespAjax.registros[0].sist_para_porta );
					$( '#AuthSmtpPara' ).prop( 'checked', vRespAjax.registros[0].sist_para_auth );
					$( '#UsuaSmtpPara' ).val( vRespAjax.registros[0].sist_para_user );
					$( '#SenhaSmtpPara' ).val( vRespAjax.registros[0].sis_para_pwd );
					$( '#CriptSmtpPara' ).prop( 'checked', vRespAjax.registros[0].sist_para_secu );
					$( '#EmailSmtpPara' ).val( vRespAjax.registros[0].sis_para_from );
					$( '#NomeSmtpPara' ).val( vRespAjax.registros[0].sis_para_from_name );
					$( '.nicEdit-main' ).html( vRespAjax.registros[0].sis_para_cabe );
				} else {
					$( '#IdenPara' ).val( 'Automatico' );
					$( '#LabeLogoPara' ).html( 'Selecione um Arquivo' );
					$( '#LabeSeloPara' ).html( 'Selecione um Arquivo' );
					$( '#SmtpPara' ).val( '' );
					$( '#PortSmtpPara' ).val( '587' );
					$( '#AuthSmtpPara' ).prop( 'checked', 'true' );
					$( '#UsuaSmtpPara' ).val( '' );
					$( '#SenhaSmtpPara' ).val( '' );
					$( '#CriptSmtpPara' ).prop( 'checked', 'true' );
					$( '#EmailSmtpPara' ).val( '' );
					$( '#NomeSmtpPara' ).val( '' );
					$( '.nicEdit-main' ).html( '' );
				};
				vResp ( vRespAjax );
			}
		);
	};

	/**
	 * Método para salvar
	 * no sistema
	 * 
	 * @param  VThis - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static SetSalvPara( VThis, vResp ) {
		Core.SetAjax({
			evento:{
				IdenPara: $( '#IdenPara' ).val(),
				LogoPara: $( '#LabeLogoPara' ).html(),
				BaseLogoPara: $( '#LogoPara' ).attr( 'data-arqu' ),
				SeloPara: $( '#LabeSeloPara' ).html(),
				BaseSeloPara: $( '#SeloPara' ).attr( 'data-arqu' ),
				SmtpPara: $( '#SmtpPara' ).val(),
				PortSmtpPara: $( '#PortSmtpPara' ).val(),
				AuthSmtpPara: $( '#AuthSmtpPara' ).prop( 'checked' ),
				UsuaSmtpPara: $( '#UsuaSmtpPara' ).val(),
				SenhaSmtpPara: $( '#SenhaSmtpPara' ).val(),
				CriptSmtpPara: $( '#CriptSmtpPara' ).prop( 'checked' ),
				EmailSmtpPara: $( '#EmailSmtpPara' ).val(),
				NomeSmtpPara: $( '#NomeSmtpPara' ).val(),
				CabePara: $( '.nicEdit-main' ).html(),
				FiltTenanPara: $( '#FiltTenanPara' ).val(),
				FiltEmprePara: $( '#FiltEmprePara' ).val(),
			}},
			'../../Comum/Parametros/SetSalvPara/', function( vRespAjax ){
				Core.SetMensMenu( vRespAjax.detalhes, vRespAjax.registros, 'AVISO')
				Core.MensMenu.show();
				setTimeout( function(){
					vResp( { vRespAjax: vRespAjax } );
				}, 300);
			}
		);
	};
};