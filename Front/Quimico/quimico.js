/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../Core/Core.class.js';

$(document).ready(function( ) {
    var vFocuQuimi = '';
    var vLinhSalv = '';
    var vTipoOpera = '';
    var vLinhDele = '';
    var vThisDele = '';
/*--FILTRAR*/
    $(document).off( 'click', '#FiltBtnQuimi' );
    $(document).on( 'click', '#FiltBtnQuimi', function(event){
        Core.LoadMenu.show()
        Core.Quimico.GetTableQuimi( '#TableQuimi', { 
            evento:{
                'amos_cada_regi': '%' + $( '#FiltRgQuimi' ).val() + '%',
				'amos_cada_orse': '%' + $( '#FiltOsQuimi' ).val() + '%',
				'amos_cada_emis_ini': $( '#FiltEmisIniQuimi' ).val(),
				'amos_cada_emis_fim': $( '#FiltEmisFimQuimi' ).val(),
				'amos_cada_clie_iden': $( '#FiltClieQuimi' ).val(),
				'amos_cada_fabr_iden': $( '#FiltFabrQuimi' ).val(),
				'amos_cada_area_iden': $( '#FiltAreQuimi' ).val(),
				'amos_cada_tenan': $( '#FiltTenanQuimi' ).val(),
				'amos_cada_empre': $( '#FiltEmpreQuimi' ).val(),
				'amos_quimi_cada_fina': '%' + $( '#StatQuimi' ).val() + '%',
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
            $( '#FiltRgQuimi' ).focus();
        });
    });
/*--INICIALIZAÇÃO*/
    Core.LoadMenu.show();
    Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Laboratorio/Quimico/GetTenanQuimi/', function( Resposta ){
        Core.SetSele2( $( '#FiltTenanQuimi' ), Resposta.registros, function(){
            $( '#FiltTenanQuimi' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
            if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
                $( '#FiltTenanQuimi' ).prop( 'disabled', true );
            };
            Core.SetAjax( { evento: 
              { empre_cada_stat: '%%',
                empre_cada_tenant: $( '#FiltTenanQuimi' ).val() 
              } }, '../../Laboratorio/Quimico/GetEmpreQuimi/', function( Resposta ){
                Core.SetSele2( $( '#FiltEmpreQuimi' ), Resposta.registros, function(){
                    $( '#FiltEmpreQuimi' ).val( Core.Login.GetUsuaSess( 'usua_cada_empre' ) ).trigger( 'change' );
                    if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
                        $( '#FiltEmpreQuimi' ).prop( 'disabled', true );
                    };
                    Core.SetAjax( { evento: 
                      { clie_cada_stat: '%%',
                        clie_cada_tenan: $( '#FiltTenanQuimi' ).val(),
                        clie_cada_empre: $( '#FiltEmpreQuimi' ).val(),
                      } }, '../../Laboratorio/Quimico/GetClieQuimi/', function( Resposta ){
                        Core.SetSele2( $( '#FiltClieQuimi' ), Resposta.registros, function(){
                            Core.SetAjax( { evento: 
                              { fabr_cada_stat: '%%',
                                fabr_cada_tenan: $( '#FiltTenanQuimi' ).val(),
                                fabr_cada_empre: $( '#FiltEmpreQuimi' ).val(),
                              } }, '../../Laboratorio/Quimico/GetFabrQuimi/', function( Resposta ){
                                Core.SetSele2( $( '#FiltFabrQuimi' ), Resposta.registros, function(){
                                    Core.SetAjax( { evento: 
                                      { area_cada_stat: '%%',
                                        area_cada_tenan: $( '#FiltTenanQuimi' ).val(),
                                        area_cada_empre: $( '#FiltEmpreQuimi' ).val(),
                                      } }, '../../Laboratorio/Quimico/GetAreaQuimi/', function( Resposta ){
                                        Core.SetSele2( $( '#FiltAreQuimi' ), Resposta.registros, function(){
                                            Core.SetMask( '#FiltEmisIniQuimi, #FiltEmisFimQuimi', 'DATA' );
                                            $( '#FiltEmisIniQuimi' ).val ( Core.Data().subtract ( 30, 'days' ).format('L') );
                                            $( '#FiltEmisFimQuimi' ).val ( Core.Data().endOf('month').format('L') );
                                            $( '#FiltBtnQuimi' ).click();
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
    $(document).off( 'change', '#FiltTenanQuimi' );
    $(document).on( 'change', '#FiltTenanQuimi', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
          { empre_cada_stat: '%%',
            empre_cada_tenant: $( this ).val() 
          } }, '../../Laboratorio/Quimico/GetEmpreQuimi/', function( Resposta ){
            Core.SetSele2( $( '#FiltEmpreQuimi' ), Resposta.registros, function(){
                Core.SetAjax( { evento: 
                  { clie_cada_stat: '%%',
                    clie_cada_tenan: $( '#FiltTenanQuimi' ).val(),
                    clie_cada_empre: $( '#FiltEmpreQuimi' ).val(),
                  } }, '../../Laboratorio/Quimico/GetClieQuimi/', function( Resposta ){
                    Core.SetSele2( $( '#FiltClieQuimi' ), Resposta.registros, function(){
                        Core.SetAjax( { evento: 
                          { fabr_cada_stat: '%%',
                            fabr_cada_tenan: $( '#FiltTenanQuimi' ).val(),
                            fabr_cada_empre: $( '#FiltEmpreQuimi' ).val(),
                          } }, '../../Laboratorio/Quimico/GetFabrQuimi/', function( Resposta ){
                            Core.SetSele2( $( '#FiltFabrQuimi' ), Resposta.registros, function(){
                                Core.SetAjax( { evento: 
                                  { area_cada_stat: '%%',
                                    area_cada_tenan: $( '#FiltTenanQuimi' ).val(),
                                    area_cada_empre: $( '#FiltEmpreQuimi' ).val(),
                                  } }, '../../Laboratorio/Quimico/GetAreaQuimi/', function( Resposta ){
                                    Core.SetSele2( $( '#FiltAreQuimi' ), Resposta.registros, function(){
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
    $(document).off( 'change', '#FiltEmpreQuimi' );
    $(document).on( 'change', '#FiltEmpreQuimi', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
          { clie_cada_stat: '%%',
            clie_cada_tenan: $( '#FiltTenanQuimi' ).val(),
            clie_cada_empre: $( '#FiltEmpreQuimi' ).val(),
          } }, '../../Laboratorio/Quimico/GetClieQuimi/', function( Resposta ){
            Core.SetSele2( $( '#FiltClieQuimi' ), Resposta.registros, function(){
                Core.SetAjax( { evento: 
                  { fabr_cada_stat: '%%',
                    fabr_cada_tenan: $( '#FiltTenanQuimi' ).val(),
                    fabr_cada_empre: $( '#FiltEmpreQuimi' ).val(),
                  } }, '../../Laboratorio/Quimico/GetFabrQuimi/', function( Resposta ){
                    Core.SetSele2( $( '#FiltFabrQuimi' ), Resposta.registros, function(){
                        Core.SetAjax( { evento: 
                          { area_cada_stat: '%%',
                            area_cada_tenan: $( '#FiltTenanQuimi' ).val(),
                            area_cada_empre: $( '#FiltEmpreQuimi' ).val(),
                          } }, '../../Laboratorio/Quimico/GetAreaQuimi/', function( Resposta ){
                            Core.SetSele2( $( '#FiltAreQuimi' ), Resposta.registros, function(){
                                Core.LoadMenu.hide();
                            });
                        });
                    });
                });
            });
        });    
    });
/*--ENTER NO IMPUTS*/
    $(document).off( 'keypress', '#FiltRgQuimi, #FiltOsQuimi, #FiltEmisIniQuimi, #FiltEmisFimQuimi' );
    $(document).on( 'keypress', '#FiltRgQuimi, #FiltOsQuimi, #FiltEmisIniQuimi, #FiltEmisFimQuimi', function(event){
        if( event.keyCode == 13 ) {
            $( '#FiltBtnQuimi' ).click();
        }
    });
/*--EDITA*/
    $(document).off( 'click', '#EditBtnQuimi' );
    $(document).on( 'click', '#EditBtnQuimi', function(event){
        vLinhSalv = $( this ).parent().parent();
        Core.LoadMenu.show()
        Core.Quimico.GetEdtQuimi( this, function( ResObjPai ){
            vTipoOpera = '%%';
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#ResulQuimi' ).focus();          
        });
    });
/*--FINALIZA*/
    $(document).off( 'click', '#FinaQuimi' );
    $(document).on( 'click', '#FinaQuimi', function(event){
        var VThis = $( this );
        Core.GetObjtPai( VThis, [ 'FormQuimi' ], function( ResObjPai ){
            if ( $( VThis ).is(':checked') ) {
                $( ResObjPai ).find( '#DatFinaQuimi' ).prop( 'disabled', false );
                $( ResObjPai ).find( '#ExcutQuimi' ).prop( 'disabled', false );
                $( ResObjPai ).find( '#DatFinaQuimi' ).attr( 'data-obriga', 'S' );
                $( ResObjPai ).find( '#ExcutQuimi' ).attr( 'data-obriga', 'S' );
                $( ResObjPai ).find( '#DatFinaQuimi' ).focus();
                if ( $( ResObjPai ).find( '#DatFinaQuimi' ).val() == '' ){
                    $( ResObjPai ).find( '#DatFinaQuimi' ).val ( Core.Data().format('L') );
                };
            } else {
                $( ResObjPai ).find( '#DatFinaQuimi' ).prop( 'disabled', true );
                $( ResObjPai ).find( '#ExcutQuimi' ).prop( 'disabled', true );
                $( ResObjPai ).find( '#DatFinaQuimi' ).attr( 'data-obriga', 'N' );
                $( ResObjPai ).find( '#ExcutQuimi' ).attr( 'data-obriga', 'N' );
            };
        });
    });
/*--SALVAR*/
    $(document).off( 'click', '#SalvQuimi' );
    $(document).on( 'click', '#SalvQuimi', function(event){
        var vThis = this;
        Core.LoadMenu.show()
        Core.Quimico.SetSalvQuimi( vThis, vLinhSalv, function( Resposta ){
            if ( Resposta.vRespAjax != undefined ){
                if ( Resposta.vRespAjax.status == 'sucesso' ){
                    Core.Quimico.GetCloseQuimi( vThis, function(){
                        vFocuQuimi = '';
                        $( '#TabQuimi' ).click();
                        $( '#FiltBtnQuimi' ).click();
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
    $(document).off( 'click', '#FechQuimi' );
    $(document).on( 'click', '#FechQuimi', function(event){
        Core.LoadMenu.show()
        Core.Quimico.GetCloseQuimi( this, function(){
            $( '#TabQuimi' ).click();
            $( '#FiltBtnQuimi' ).click();
            Core.LoadMenu.hide();
        });
    });
/*--FECHA AVISO*/
    $(document).off( 'hidden.bs.modal', '#MensMenu' );
    $(document).on( 'hidden.bs.modal', '#MensMenu', function(event){
        if ( vFocuQuimi != '' ){
            $( vFocuQuimi ).select();
            $( vFocuQuimi ).focus();
        };
    });
/*--IMPRIMIR*/
    $(document).off( 'click', '#ImprBtnQuimi' );
    $(document).on( 'click', '#ImprBtnQuimi', function(event){
        var vLinha = $( this ).parent().parent();
        Core.LoadMenu.show()
        Core.Quimico.SetImpreQuimi( { 
            evento:{
                IdenQuimi: Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_cada_iden' ),
				RGQuimi: Core.Quimico.GetDataTableQuimi( '#TableQuimi', vLinha, 'amos_cada_regi' ), 
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
			      '../../Laboratorio/Quimico/SetExclArqu/', function( vRespAjax ){}
                );
            };            
            $( '#FiltBtnQuimi' ).click();
        });
    });
/*--ANEXO INCLUIR*/
    $(document).off( 'click', '#AddAnexBtnQuimi' );
    $(document).on( 'click', '#AddAnexBtnQuimi', function(event){
        Core.GetObjtPai( this, [ 'AddListQuimi', 'EdtListQuimi' ], function( ResObjPai ){
            Core.Anexos.GetAddAnex( $( ResObjPai ).find( '#AnexTableQuimi' ), function( ResLinhaTabel ){
                $( $( ResObjPai ).find( ResLinhaTabel ) ).find( '#TipoAnexQuimi' ).focus();         
            });
        });
    });
/*--ANEXO EXCLUIR*/	
    $(document).off( 'click', '#DeleAnexBtnQuimi' );
    $(document).on( 'click', '#DeleAnexBtnQuimi', function(){
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
        Core.GetObjtPai( vThisDele, [ 'AddListQuimi', 'EdtListQuimi' ], function( ResObjPai ){
            Core.Anexos.SetDeleAnex( $( ResObjPai ).find( '#AnexTableQuimi' ), vLinhDele, function( vRespAjax ){
                Core.LoadMenu.hide();
            });
        });
    });
/*--ANEXO ARQUIVO UPLOAD*/
    $(document).off( 'change', '#FileAnexQuimi' );
    $(document).on( 'change', '#FileAnexQuimi', function(e){
        Core.LoadMenu.show()
        var Vthis = this;
        $( this ).parent().find( '#FileAnexLabeQuimi' ).html( e.target.files[0].name ) 
        var reader = new FileReader();
        reader.readAsDataURL( e.target.files[0] );
        reader.onload = function () {
            $( Vthis ).attr( 'data-arqu', reader.result );
            Core.LoadMenu.hide();
        };
    });
/*--ANEXO DOWNLOAD*/
    $(document).off( 'click', '#DownAnexBtnQuimi' );
    $(document).on('click', '#DownAnexBtnQuimi', function(){
        Core.LoadMenu.show() 
        var vIdenQuimi = '';
        Core.GetObjtPai( this, [ 'AddListQuimi', 'EdtListQuimi' ], function( ResObjPai ){
            vIdenQuimi = $( ResObjPai ).find( '#IdenQuimi' ).val()
        });
        var Param = {
            ArqAnex: $( this ).parent().parent().find( '#FileAnexQuimi' ).val().toLowerCase().trim(),
            DadoArqAnex: $( this ).parent().parent().find( '#FileAnexQuimi' ).attr( 'data-arqu' ),
            FileAnexLabe: $( this ).parent().parent().find( '#FileAnexLabeQuimi' ).html().toLowerCase().trim(),
            IdenQuimi: vIdenQuimi,
            anexo_ensa_tabe: 'QUIMICO',
        };
        Core.Anexos.SetDownAnex( Param, function ( ResObjDonw ){
            Core.LoadMenu.hide();
        })
    });
});
