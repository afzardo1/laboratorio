/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../../Core/Core.class.js';

$(document).ready(function( ) {
    var vFocuTrac = '';
    var vLinhSalv = '';
    var vTipoOpera = '';
    var vLinhDele = '';
    var vThisDele = '';
/*--FILTRAR*/
    $(document).off( 'click', '#FiltBtnTrac' );
    $(document).on( 'click', '#FiltBtnTrac', function(event){
        Core.LoadMenu.show()
        Core.Tracao.GetTableTrac( '#TableTrac', { 
            evento:{
                'amos_cada_regi': '%' + $( '#FiltRgTrac' ).val() + '%',
				'amos_cada_orse': '%' + $( '#FiltOsTrac' ).val() + '%',
				'amos_cada_emis_ini': $( '#FiltEmisIniTrac' ).val(),
				'amos_cada_emis_fim': $( '#FiltEmisFimTrac' ).val(),
				'amos_cada_clie_iden': $( '#FiltClieTrac' ).val(),
				'amos_cada_fabr_iden': $( '#FiltFabrTrac' ).val(),
				'amos_cada_area_iden': $( '#FiltAreTrac' ).val(),
				'amos_cada_tenan': $( '#FiltTenanTrac' ).val(),
				'amos_cada_empre': $( '#FiltEmpreTrac' ).val(),
				'amos_tracao_cada_fina': '%' + $( '#StatTrac' ).val() + '%',
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
            $( '#FiltRgTrac' ).focus();
        });
    });
/*--INICIALIZAÇÃO*/
    Core.LoadMenu.show();
    Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Laboratorio/Tracao/GetTenanTrac/', function( Resposta ){
        Core.SetSele2( $( '#FiltTenanTrac' ), Resposta.registros, function(){
            $( '#FiltTenanTrac' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
            if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
                $( '#FiltTenanTrac' ).prop( 'disabled', true );
            };
            Core.SetAjax( { evento: 
              { empre_cada_stat: '%%',
                empre_cada_tenant: $( '#FiltTenanTrac' ).val() 
              } }, '../../Laboratorio/Tracao/GetEmpreTrac/', function( Resposta ){
                Core.SetSele2( $( '#FiltEmpreTrac' ), Resposta.registros, function(){
                    $( '#FiltEmpreTrac' ).val( Core.Login.GetUsuaSess( 'usua_cada_empre' ) ).trigger( 'change' );
                    if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
                        $( '#FiltEmpreTrac' ).prop( 'disabled', true );
                    };
                    Core.SetAjax( { evento: 
                      { clie_cada_stat: '%%',
                        clie_cada_tenan: $( '#FiltTenanTrac' ).val(),
                        clie_cada_empre: $( '#FiltEmpreTrac' ).val(),
                      } }, '../../Laboratorio/Tracao/GetClieTrac/', function( Resposta ){
                        Core.SetSele2( $( '#FiltClieTrac' ), Resposta.registros, function(){
                            Core.SetAjax( { evento: 
                              { fabr_cada_stat: '%%',
                                fabr_cada_tenan: $( '#FiltTenanTrac' ).val(),
                                fabr_cada_empre: $( '#FiltEmpreTrac' ).val(),
                              } }, '../../Laboratorio/Tracao/GetFabrTrac/', function( Resposta ){
                                Core.SetSele2( $( '#FiltFabrTrac' ), Resposta.registros, function(){
                                    Core.SetAjax( { evento: 
                                      { area_cada_stat: '%%',
                                        area_cada_tenan: $( '#FiltTenanTrac' ).val(),
                                        area_cada_empre: $( '#FiltEmpreTrac' ).val(),
                                      } }, '../../Laboratorio/Tracao/GetAreaTrac/', function( Resposta ){
                                        Core.SetSele2( $( '#FiltAreTrac' ), Resposta.registros, function(){
                                            Core.SetMask( '#FiltEmisIniTrac, #FiltEmisFimTrac', 'DATA' );
                                            $( '#FiltEmisIniTrac' ).val ( Core.Data().subtract ( 30, 'days' ).format('L') );
                                            $( '#FiltEmisFimTrac' ).val ( Core.Data().endOf('month').format('L') );
                                            $( '#FiltBtnTrac' ).click();
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
    $(document).off( 'change', '#FiltTenanTrac' );
    $(document).on( 'change', '#FiltTenanTrac', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
          { empre_cada_stat: '%%',
            empre_cada_tenant: $( this ).val() 
          } }, '../../Laboratorio/Tracao/GetEmpreTrac/', function( Resposta ){
            Core.SetSele2( $( '#FiltEmpreTrac' ), Resposta.registros, function(){
                Core.SetAjax( { evento: 
                  { clie_cada_stat: '%%',
                    clie_cada_tenan: $( '#FiltTenanTrac' ).val(),
                    clie_cada_empre: $( '#FiltEmpreTrac' ).val(),
                  } }, '../../Laboratorio/Tracao/GetClieTrac/', function( Resposta ){
                    Core.SetSele2( $( '#FiltClieTrac' ), Resposta.registros, function(){
                        Core.SetAjax( { evento: 
                          { fabr_cada_stat: '%%',
                            fabr_cada_tenan: $( '#FiltTenanTrac' ).val(),
                            fabr_cada_empre: $( '#FiltEmpreTrac' ).val(),
                          } }, '../../Laboratorio/Tracao/GetFabrTrac/', function( Resposta ){
                            Core.SetSele2( $( '#FiltFabrTrac' ), Resposta.registros, function(){
                                Core.SetAjax( { evento: 
                                  { area_cada_stat: '%%',
                                    area_cada_tenan: $( '#FiltTenanTrac' ).val(),
                                    area_cada_empre: $( '#FiltEmpreTrac' ).val(),
                                  } }, '../../Laboratorio/Tracao/GetAreaTrac/', function( Resposta ){
                                    Core.SetSele2( $( '#FiltAreTrac' ), Resposta.registros, function(){
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
    $(document).off( 'change', '#FiltEmpreTrac' );
    $(document).on( 'change', '#FiltEmpreTrac', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
          { clie_cada_stat: '%%',
            clie_cada_tenan: $( '#FiltTenanTrac' ).val(),
            clie_cada_empre: $( '#FiltEmpreTrac' ).val(),
          } }, '../../Laboratorio/Tracao/GetClieTrac/', function( Resposta ){
            Core.SetSele2( $( '#FiltClieTrac' ), Resposta.registros, function(){
                Core.SetAjax( { evento: 
                  { fabr_cada_stat: '%%',
                    fabr_cada_tenan: $( '#FiltTenanTrac' ).val(),
                    fabr_cada_empre: $( '#FiltEmpreTrac' ).val(),
                  } }, '../../Laboratorio/Tracao/GetFabrTrac/', function( Resposta ){
                    Core.SetSele2( $( '#FiltFabrTrac' ), Resposta.registros, function(){
                        Core.SetAjax( { evento: 
                          { area_cada_stat: '%%',
                            area_cada_tenan: $( '#FiltTenanTrac' ).val(),
                            area_cada_empre: $( '#FiltEmpreTrac' ).val(),
                          } }, '../../Laboratorio/Tracao/GetAreaTrac/', function( Resposta ){
                            Core.SetSele2( $( '#FiltAreTrac' ), Resposta.registros, function(){
                                Core.LoadMenu.hide();
                            });
                        });
                    });
                });
            });
        });    
    });
/*--ENTER NO IMPUTS*/
    $(document).off( 'keypress', '#FiltRgTrac, #FiltOsTrac, #FiltEmisIniTrac, #FiltEmisFimTrac' );
    $(document).on( 'keypress', '#FiltRgTrac, #FiltOsTrac, #FiltEmisIniTrac, #FiltEmisFimTrac', function(event){
        if( event.keyCode == 13 ) {
            $( '#FiltBtnTrac' ).click();
        }
    });
/*--EDITA*/
    $(document).off( 'click', '#EditBtnTrac' );
    $(document).on( 'click', '#EditBtnTrac', function(event){
        vLinhSalv = $( this ).parent().parent();
        Core.LoadMenu.show()
        Core.Tracao.GetEdtTrac( this, function( ResObjPai ){
            vTipoOpera = '%%';
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#ResulTrac' ).focus();          
        });
    });
/*--FINALIZA*/
    $(document).off( 'click', '#FinaTrac' );
    $(document).on( 'click', '#FinaTrac', function(event){
        var VThis = $( this );
        Core.GetObjtPai( VThis, [ 'FormTrac' ], function( ResObjPai ){
            if ( $( VThis ).is(':checked') ) {
                $( ResObjPai ).find( '#DatFinaTrac' ).prop( 'disabled', false );
                $( ResObjPai ).find( '#ExcutTrac' ).prop( 'disabled', false );
                $( ResObjPai ).find( '#DatFinaTrac' ).attr( 'data-obriga', 'S' );
                $( ResObjPai ).find( '#ExcutTrac' ).attr( 'data-obriga', 'S' );
                $( ResObjPai ).find( '#DatFinaTrac' ).focus();
                if ( $( ResObjPai ).find( '#DatFinaTrac' ).val() == '' ){
                    $( ResObjPai ).find( '#DatFinaTrac' ).val ( Core.Data().format('L') );
                };
            } else {
                $( ResObjPai ).find( '#DatFinaTrac' ).prop( 'disabled', true );
                $( ResObjPai ).find( '#ExcutTrac' ).prop( 'disabled', true );
                $( ResObjPai ).find( '#DatFinaTrac' ).attr( 'data-obriga', 'N' );
                $( ResObjPai ).find( '#ExcutTrac' ).attr( 'data-obriga', 'N' );
            };
        });
    });
/*--SALVAR*/
    $(document).off( 'click', '#SalvTrac' );
    $(document).on( 'click', '#SalvTrac', function(event){
        var vThis = this;
        Core.LoadMenu.show()
        Core.Tracao.SetSalvTrac( vThis, vLinhSalv, function( Resposta ){
            if ( Resposta.vRespAjax != undefined ){
                if ( Resposta.vRespAjax.status == 'sucesso' ){
                    Core.Tracao.GetCloseTrac( vThis, function(){
                        vFocuTrac = '';
                        $( '#TabTrac' ).click();
                        $( '#FiltBtnTrac' ).click();
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
    $(document).off( 'click', '#FechTrac' );
    $(document).on( 'click', '#FechTrac', function(event){
        Core.LoadMenu.show()
        Core.Tracao.GetCloseTrac( this, function(){
            $( '#TabTrac' ).click();
            $( '#FiltBtnTrac' ).click();
            Core.LoadMenu.hide();
        });
    });
/*--FECHA AVISO*/
    $(document).off( 'hidden.bs.modal', '#MensMenu' );
    $(document).on( 'hidden.bs.modal', '#MensMenu', function(event){
        if ( vFocuTrac != '' ){
            $( vFocuTrac ).select();
            $( vFocuTrac ).focus();
        };
    });
/*--IMPRIMIR*/
    $(document).off( 'click', '#ImprBtnTrac' );
    $(document).on( 'click', '#ImprBtnTrac', function(event){
        var vLinha = $( this ).parent().parent();
        Core.LoadMenu.show()
        Core.Tracao.SetImpreTrac( { 
            evento:{
                IdenTrac: Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_cada_iden' ),
				RGTrac: Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_cada_regi' ), 
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
			      '../../Laboratorio/Tracao/SetExclArqu/', function( vRespAjax ){}
                );
            };            
            $( '#FiltBtnTrac' ).click();
        });
    });
/*--IMPRIMIR CERTIFICADO*/
    $(document).off( 'click', '#CertBtnTrac' );
    $(document).on( 'click', '#CertBtnTrac', function(event){
        var vLinha = $( this ).parent().parent();
        Core.LoadMenu.show()
        Core.Tracao.SetImpreCertTrac( { 
            evento:{
                sist_para_tenant: Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_cada_tenan' ),
				sist_para_empre: Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_cada_empre' ), 
                amos_cada_iden: Core.Tracao.GetDataTableTrac( '#TableTrac', vLinha, 'amos_cada_iden' ),
                amos_cada_cert: 'TRACAO', 
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
			      '../../Laboratorio/Tracao/SetExclArqu/', function( vRespAjax ){
                });
            };            
            $( '#FiltBtnTrac' ).click();
        });
    });
/*--ANEXO INCLUIR*/
    $(document).off( 'click', '#AddAnexBtnTrac' );
    $(document).on( 'click', '#AddAnexBtnTrac', function(event){
        Core.GetObjtPai( this, [ 'AddListTrac', 'EdtListTrac' ], function( ResObjPai ){
            Core.Anexos.GetAddAnex( $( ResObjPai ).find( '#AnexTableTrac' ), function( ResLinhaTabel ){
                $( $( ResObjPai ).find( ResLinhaTabel ) ).find( '#TipoAnexTrac' ).focus();         
            });
        });
    });
/*--ANEXO EXCLUIR*/	
    $(document).off( 'click', '#DeleAnexBtnTrac' );
    $(document).on( 'click', '#DeleAnexBtnTrac', function(){
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
        Core.GetObjtPai( vThisDele, [ 'AddListTrac', 'EdtListTrac' ], function( ResObjPai ){
            Core.Anexos.SetDeleAnex( $( ResObjPai ).find( '#AnexTableTrac' ), vLinhDele, function( vRespAjax ){
                Core.LoadMenu.hide();
            });
        });
    });
/*--ANEXO ARQUIVO UPLOAD*/
    $(document).off( 'change', '#FileAnexTrac' );
    $(document).on( 'change', '#FileAnexTrac', function(e){
        Core.LoadMenu.show()
        var Vthis = this;
        $( this ).parent().find( '#FileAnexLabeTrac' ).html( e.target.files[0].name ) 
        var reader = new FileReader();
        reader.readAsDataURL( e.target.files[0] );
        reader.onload = function () {
            $( Vthis ).attr( 'data-arqu', reader.result );
            Core.LoadMenu.hide();
        };
    });
/*--ANEXO DOWNLOAD*/
    $(document).off( 'click', '#DownAnexBtnTrac' );
    $(document).on('click', '#DownAnexBtnTrac', function(){
        Core.LoadMenu.show() 
        var vIdenTrac = '';
        Core.GetObjtPai( this, [ 'AddListTrac', 'EdtListTrac' ], function( ResObjPai ){
            vIdenTrac = $( ResObjPai ).find( '#IdenTrac' ).val()
        });
        var Param = {
            ArqAnex: $( this ).parent().parent().find( '#FileAnexTrac' ).val().toLowerCase().trim(),
            DadoArqAnex: $( this ).parent().parent().find( '#FileAnexTrac' ).attr( 'data-arqu' ),
            FileAnexLabe: $( this ).parent().parent().find( '#FileAnexLabeTrac' ).html().toLowerCase().trim(),
            IdenTrac: vIdenTrac,
            anexo_ensa_tabe: 'TRACAO',
        };
        Core.Anexos.SetDownAnex( Param, function ( ResObjDonw ){
            Core.LoadMenu.hide();
        })
    });
});
