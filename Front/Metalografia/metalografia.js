/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../Core/Core.class.js';

$(document).ready(function( ) {
    var vFocuMeta = '';
    var vLinhSalv = '';
    var vLinhDele = '';
    var vThisDele = '';
    var vTipoOpera = '';
/*--FILTRAR*/
    $(document).off( 'click', '#FiltBtnMeta' );
    $(document).on( 'click', '#FiltBtnMeta', function(event){
        Core.LoadMenu.show()
        Core.Metalografia.GetTableMeta( '#TableMeta', { 
            evento:{
                'amos_cada_regi': '%' + $( '#FiltRgMeta' ).val() + '%',
				'amos_cada_orse': '%' + $( '#FiltOsMeta' ).val() + '%',
				'amos_cada_emis_ini': $( '#FiltEmisIniMeta' ).val(),
				'amos_cada_emis_fim': $( '#FiltEmisFimMeta' ).val(),
				'amos_cada_clie_iden': $( '#FiltClieMeta' ).val(),
				'amos_cada_fabr_iden': $( '#FiltFabrMeta' ).val(),
				'amos_cada_area_iden': $( '#FiltAreMeta' ).val(),
				'amos_cada_tenan': $( '#FiltTenanMeta' ).val(),
				'amos_cada_empre': $( '#FiltEmpreMeta' ).val(),
				'amos_meta_cada_fina': '%' + $( '#StatFabr' ).val() + '%',
            }
        }, function( vRespLogi ){
            if ( vRespLogi.status != 'sucesso' ){
                $( '#AlertMenuCont' ).html(
                    '<div id="AlertMenu" class="alert alert-warning alert-dismissible fade" role="alert">' +
                        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                    '</div>'
                );
                $( '#AlertMenu' ).removeClass('alert alert-warning');
                $( '#AlertMenu' ).removeClass('alert alert-danger');
                if ( vRespLogi.status == 'invalido'){
                    $( '#AlertMenu' ).addClass('alert alert-warning');
                } else if ( vRespLogi.status == 'erro'){
                    $( '#AlertMenu' ).addClass('alert alert-danger');
                };
                $( '#AlertMenu' ).prepend( vRespLogi.detalhes );
                $( '#AlertMenu' ).addClass('show');
                $( '#AlertMenu' ).show();
            }
            Core.LoadMenu.hide();
            $( '#FiltRgMeta' ).focus();
        });
    });
/*--INICIALIZAÇÃO*/
    Core.LoadMenu.show();
    Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Metalografia/GetTenanMeta/', function( Resposta ){
        Core.SetSele2( $( '#FiltTenanMeta' ), Resposta.registros, function(){
            $( '#FiltTenanMeta' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
            if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
                $( '#FiltTenanMeta' ).prop( 'disabled', true );
            };
            Core.SetAjax( { evento: 
              { empre_cada_stat: '%%',
                empre_cada_tenant: $( '#FiltTenanMeta' ).val() 
              } }, '../../Metalografia/GetEmpreMeta/', function( Resposta ){
                Core.SetSele2( $( '#FiltEmpreMeta' ), Resposta.registros, function(){
                    $( '#FiltEmpreMeta' ).val( Core.Login.GetUsuaSess( 'usua_cada_empre' ) ).trigger( 'change' );
                    if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
                        $( '#FiltEmpreMeta' ).prop( 'disabled', true );
                    };
                    Core.SetAjax( { evento: 
                      { clie_cada_stat: '%%',
                        clie_cada_tenan: $( '#FiltTenanMeta' ).val(),
                        clie_cada_empre: $( '#FiltEmpreMeta' ).val(),
                      } }, '../../Metalografia/GetClieMeta/', function( Resposta ){
                        Core.SetSele2( $( '#FiltClieMeta' ), Resposta.registros, function(){
                            Core.SetAjax( { evento: 
                              { fabr_cada_stat: '%%',
                                fabr_cada_tenan: $( '#FiltTenanMeta' ).val(),
                                fabr_cada_empre: $( '#FiltEmpreMeta' ).val(),
                              } }, '../../Metalografia/GetFabrMeta/', function( Resposta ){
                                Core.SetSele2( $( '#FiltFabrMeta' ), Resposta.registros, function(){
                                    Core.SetAjax( { evento: 
                                      { area_cada_stat: '%%',
                                        area_cada_tenan: $( '#FiltTenanMeta' ).val(),
                                        area_cada_empre: $( '#FiltEmpreMeta' ).val(),
                                      } }, '../../Metalografia/GetAreaMeta/', function( Resposta ){
                                        Core.SetSele2( $( '#FiltAreMeta' ), Resposta.registros, function(){
                                            Core.SetMask( '#FiltEmisIniMeta, #FiltEmisFimMeta', 'DATA' );
                                            $( '#FiltEmisIniMeta' ).val ( Core.Data().subtract ( 30, 'days' ).format('L') );
                                            $( '#FiltEmisFimMeta' ).val ( Core.Data().endOf('month').format('L') );
                                            $( '#FiltBtnMeta' ).click();
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    });
/*--FILTRO TENANT*/
    $(document).off( 'change', '#FiltTenanMeta' );
    $(document).on( 'change', '#FiltTenanMeta', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
          { empre_cada_stat: '%%',
            empre_cada_tenant: $( this ).val() 
          } }, '../../Metalografia/GetEmpreMeta/', function( Resposta ){
            Core.SetSele2( $( '#FiltEmpreMeta' ), Resposta.registros, function(){
                Core.SetAjax( { evento: 
                  { clie_cada_stat: '%%',
                    clie_cada_tenan: $( '#FiltTenanMeta' ).val(),
                    clie_cada_empre: $( '#FiltEmpreMeta' ).val(),
                  } }, '../../Metalografia/GetClieMeta/', function( Resposta ){
                    Core.SetSele2( $( '#FiltClieMeta' ), Resposta.registros, function(){
                        Core.SetAjax( { evento: 
                          { fabr_cada_stat: '%%',
                            fabr_cada_tenan: $( '#FiltTenanMeta' ).val(),
                            fabr_cada_empre: $( '#FiltEmpreMeta' ).val(),
                          } }, '../../Metalografia/GetFabrMeta/', function( Resposta ){
                            Core.SetSele2( $( '#FiltFabrMeta' ), Resposta.registros, function(){
                                Core.SetAjax( { evento: 
                                  { area_cada_stat: '%%',
                                    area_cada_tenan: $( '#FiltTenanMeta' ).val(),
                                    area_cada_empre: $( '#FiltEmpreMeta' ).val(),
                                  } }, '../../Metalografia/GetAreaMeta/', function( Resposta ){
                                    Core.SetSele2( $( '#FiltAreMeta' ), Resposta.registros, function(){
                                        Core.LoadMenu.hide();
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });    
    });
/*--FILTRO EMPRESA*/
    $(document).off( 'change', '#FiltEmpreMeta' );
    $(document).on( 'change', '#FiltEmpreMeta', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
          { clie_cada_stat: '%%',
            clie_cada_tenan: $( '#FiltTenanMeta' ).val(),
            clie_cada_empre: $( '#FiltEmpreMeta' ).val(),
          } }, '../../Metalografia/GetClieMeta/', function( Resposta ){
            Core.SetSele2( $( '#FiltClieMeta' ), Resposta.registros, function(){
                Core.SetAjax( { evento: 
                  { fabr_cada_stat: '%%',
                    fabr_cada_tenan: $( '#FiltTenanMeta' ).val(),
                    fabr_cada_empre: $( '#FiltEmpreMeta' ).val(),
                  } }, '../../Metalografia/GetFabrMeta/', function( Resposta ){
                    Core.SetSele2( $( '#FiltFabrMeta' ), Resposta.registros, function(){
                        Core.SetAjax( { evento: 
                          { area_cada_stat: '%%',
                            area_cada_tenan: $( '#FiltTenanMeta' ).val(),
                            area_cada_empre: $( '#FiltEmpreMeta' ).val(),
                          } }, '../../Metalografia/GetAreaMeta/', function( Resposta ){
                            Core.SetSele2( $( '#FiltAreMeta' ), Resposta.registros, function(){
                                Core.LoadMenu.hide();
                            });
                        });
                    });
                });
            });
        });    
    });
/*--ENTER NO IMPUTS*/
    $(document).off( 'keypress', '#FiltRgMeta, #FiltOsMeta, #FiltEmisIniMeta, #FiltEmisFimMeta' );
    $(document).on( 'keypress', '#FiltRgMeta, #FiltOsMeta, #FiltEmisIniMeta, #FiltEmisFimMeta', function(event){
        if( event.keyCode == 13 ) {
            $( '#FiltBtnMeta' ).click();
        }
    });
/*--EDITA*/
    $(document).off( 'click', '#EditBtnMeta' );
    $(document).on( 'click', '#EditBtnMeta', function(event){
        vLinhSalv = $( this ).parent().parent();
        Core.LoadMenu.show()
        Core.Metalografia.GetEdtMeta( this, function( ResObjPai ){
            vTipoOpera = '%%';
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#ResulMeta' ).focus();          
        });
    });
/*--FINALIZA*/
    $(document).off( 'click', '#FinaMeta' );
    $(document).on( 'click', '#FinaMeta', function(event){
        var VThis = $( this );
        Core.GetObjtPai( VThis, [ 'FormMeta' ], function( ResObjPai ){
            if ( $( VThis ).is(':checked') ) {
                $( ResObjPai ).find( '#DatFinaMeta' ).prop( 'disabled', false );
                $( ResObjPai ).find( '#ExcutMeta' ).prop( 'disabled', false );
                $( ResObjPai ).find( '#DatFinaMeta' ).attr( 'data-obriga', 'S' );
                $( ResObjPai ).find( '#ExcutMeta' ).attr( 'data-obriga', 'S' );
                $( ResObjPai ).find( '#DatFinaMeta' ).focus();
                if ( $( ResObjPai ).find( '#DatFinaMeta' ).val() == '' ){
                    $( ResObjPai ).find( '#DatFinaMeta' ).val ( Core.Data().format('L') );
                };
            } else {
                $( ResObjPai ).find( '#DatFinaMeta' ).prop( 'disabled', true );
                $( ResObjPai ).find( '#ExcutMeta' ).prop( 'disabled', true );
                $( ResObjPai ).find( '#DatFinaMeta' ).attr( 'data-obriga', 'N' );
                $( ResObjPai ).find( '#ExcutMeta' ).attr( 'data-obriga', 'N' );
            };
        });
    });
/*--SALVAR*/
    $(document).off( 'click', '#SalvMeta' );
    $(document).on( 'click', '#SalvMeta', function(event){
        var vThis = this;
        Core.LoadMenu.show()
        Core.Metalografia.SetSalvMeta( vThis, vLinhSalv, function( Resposta ){
            if ( Resposta.vRespAjax != undefined ){
                if ( Resposta.vRespAjax.status == 'sucesso' ){
                    Core.Metalografia.GetCloseMeta( vThis, function(){
                        vFocuMeta = '';
                        $( '#TabMeta' ).click();
                        $( '#FiltBtnMeta' ).click();
                        Core.LoadMenu.hide();
                    });
                } else {
                    Core.LoadMenu.hide();
                }
            } else {
                Core.LoadMenu.hide();
                $( Resposta.vResObjPai ).find( Resposta.vResObjVali ).focus();
            };
        });
    });
/*--FECHA*/
    $(document).off( 'click', '#FechMeta' );
    $(document).on( 'click', '#FechMeta', function(event){
        Core.LoadMenu.show()
        Core.Metalografia.GetCloseMeta( this, function(){
            $( '#TabMeta' ).click();
            $( '#FiltBtnMeta' ).click();
            Core.LoadMenu.hide();
        });
    });
/*--FECHA AVISO*/
    $(document).off( 'hidden.bs.modal', '#MensMenu' );
    $(document).on( 'hidden.bs.modal', '#MensMenu', function(event){
        if ( vFocuMeta != '' ){
            $( vFocuMeta ).select();
            $( vFocuMeta ).focus();
        };
    });
/*--IMPRIMIR*/
    $(document).off( 'click', '#ImprBtnMeta' );
    $(document).on( 'click', '#ImprBtnMeta', function(event){
        var vLinha = $( this ).parent().parent();
        Core.LoadMenu.show()
        Core.Metalografia.SetImpreMeta( { 
            evento:{
                IdenMeta: Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_meta_cada_iden' ),
				RGMeta: Core.Metalografia.GetDataTableMeta( '#TableMeta', vLinha, 'amos_cada_regi' ), 
            }
        }, function( vRespLogi ){
            if ( vRespLogi.status != 'sucesso' ){
                $( '#AlertMenuCont' ).html(
                    '<div id="AlertMenu" class="alert alert-warning alert-dismissible fade" role="alert">' +
                        '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>' +
                    '</div>'
                );
                $( '#AlertMenu' ).removeClass('alert alert-warning');
                $( '#AlertMenu' ).removeClass('alert alert-danger');
                if ( vRespLogi.status == 'invalido'){
                    $( '#AlertMenu' ).addClass('alert alert-warning');
                } else if ( vRespLogi.status == 'erro'){
                    $( '#AlertMenu' ).addClass('alert alert-danger');
                };
                $( '#AlertMenu' ).prepend( vRespLogi.detalhes );
                $( '#AlertMenu' ).addClass('show');
                $( '#AlertMenu' ).show();
            } else {
                window.open( vRespLogi.registros );
                Core.SetAjax({
			        evento:{
				        ArquiExcl: vRespLogi.registros,
			        }},
			      '../../Metalografia/SetExclArqu/', function( vRespAjax ){
                });
            };            
            $( '#FiltBtnMeta' ).click();
        });
    });
/*--ANEXO INCLUIR*/
    $(document).off( 'click', '#AddAnexBtnMeta' );
    $(document).on( 'click', '#AddAnexBtnMeta', function(event){
        Core.GetObjtPai( this, [ 'AddListMeta', 'EdtListMeta' ], function( ResObjPai ){
            Core.Anexos.GetAddAnex( $( ResObjPai ).find( '#AnexTableMeta' ), function( ResLinhaTabel ){
                $( $( ResObjPai ).find( ResLinhaTabel ) ).find( '#TipoAnexMeta' ).focus();         
            });
        });
    });
/*--ANEXO EXCLUIR*/	
	$(document).off( 'click', '#DeleAnexBtnMeta' );
	$(document).on( 'click', '#DeleAnexBtnMeta', function(){
		vLinhDele = $( this ).parent().parent();
        vThisDele = this; 
        Core.SetMensMenu( 'Exclusão de Anexos', 'DESEJA REALMENTE EXCLUIR ESSE REGISTRO', 'PERGUNTA' );
        Core.MensMenu.show();
	});
/*--BOTÃO SIM PERGUNTA*/
    $(document).off( 'click', '#SimMensMenu' );
    $(document).on( 'click', '#SimMensMenu', function(event){
        Core.MensMenu.hide();
        Core.LoadMenu.show();
        Core.GetObjtPai( vThisDele, [ 'AddListMeta', 'EdtListMeta' ], function( ResObjPai ){
            Core.Anexos.SetDeleAnex( $( ResObjPai ).find( '#AnexTableMeta' ), vLinhDele, function( vRespAjax ){
                Core.LoadMenu.hide();
            });
        });
    });
/*--ANEXO ARQUIVO UPLOAD*/
    $(document).off( 'change', '#FileAnexMeta' );
    $(document).on( 'change', '#FileAnexMeta', function(e){
        Core.LoadMenu.show()
        var Vthis = this;
        $( this ).parent().find( '#FileAnexLabeMeta' ).html( e.target.files[0].name ) 
        var reader = new FileReader();
        reader.readAsDataURL( e.target.files[0] );
        reader.onload = function () {
            $( Vthis ).attr( 'data-arqu', reader.result );
            Core.LoadMenu.hide();
        };
    });
/*--ANEXO DOWNLOAD*/
	$(document).off( 'click', '#DownAnexBtnMeta' );
	$(document).on('click', '#DownAnexBtnMeta', function(){
        Core.LoadMenu.show() 
        var vIdenMeta = '';
        Core.GetObjtPai( this, [ 'AddListMeta', 'EdtListMeta' ], function( ResObjPai ){
            vIdenMeta = $( ResObjPai ).find( '#IdenMeta' ).val()
        });
        var Param = {
            ArqAnex: $( this ).parent().parent().find( '#FileAnexMeta' ).val().toLowerCase().trim(),
            DadoArqAnex: $( this ).parent().parent().find( '#FileAnexMeta' ).attr( 'data-arqu' ),
            FileAnexLabe: $( this ).parent().parent().find( '#FileAnexLabeMeta' ).html().toLowerCase().trim(),
            IdenMeta: vIdenMeta,
            anexo_ensa_tabe: 'METALOGRAFIA',
        };
        Core.Anexos.SetDownAnex( Param, function ( ResObjDonw ){
            Core.LoadMenu.hide();
        })
	});
});
