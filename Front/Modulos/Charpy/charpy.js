/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../../Core/Core.class.js';

$(document).ready(function( ) {
    var vFocuCharp = '';
    var vLinhSalv = '';
    var vTipoOpera = '';
    var vLinhDele = '';
    var vThisDele = '';
/*--FILTRAR*/
    $(document).off( 'click', '#FiltBtnCharp' );
    $(document).on( 'click', '#FiltBtnCharp', function(event){
        Core.LoadMenu.show()
        Core.Charpy.GetTableCharp( '#TableCharp', { 
            evento:{
                'amos_cada_regi': '%' + $( '#FiltRgCharp' ).val() + '%',
				'amos_cada_orse': '%' + $( '#FiltOsCharp' ).val() + '%',
				'amos_cada_emis_ini': $( '#FiltEmisIniCharp' ).val(),
				'amos_cada_emis_fim': $( '#FiltEmisFimCharp' ).val(),
				'amos_cada_clie_iden': $( '#FiltClieCharp' ).val(),
				'amos_cada_fabr_iden': $( '#FiltFabrCharp' ).val(),
				'amos_cada_area_iden': $( '#FiltAreCharp' ).val(),
				'amos_cada_tenan': $( '#FiltTenanCharp' ).val(),
				'amos_cada_empre': $( '#FiltEmpreCharp' ).val(),
				'amos_charpy_cada_fina': '%' + $( '#StatCharp' ).val() + '%',
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
            $( '#FiltRgCharp' ).focus();
        });
    });
/*--INICIALIZAÇÃO*/
    Core.LoadMenu.show();
    Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Laboratorio/Charpy/GetTenanCharp/', function( Resposta ){
        Core.SetSele2( $( '#FiltTenanCharp' ), Resposta.registros, function(){
            $( '#FiltTenanCharp' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
            if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
                $( '#FiltTenanCharp' ).prop( 'disabled', true );
            };
            Core.SetAjax( { evento: 
              { empre_cada_stat: '%%',
                empre_cada_tenant: $( '#FiltTenanCharp' ).val() 
              } }, '../../Laboratorio/Charpy/GetEmpreCharp/', function( Resposta ){
                Core.SetSele2( $( '#FiltEmpreCharp' ), Resposta.registros, function(){
                    $( '#FiltEmpreCharp' ).val( Core.Login.GetUsuaSess( 'usua_cada_empre' ) ).trigger( 'change' );
                    if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
                        $( '#FiltEmpreCharp' ).prop( 'disabled', true );
                    };
                    Core.SetAjax( { evento: 
                      { clie_cada_stat: '%%',
                        clie_cada_tenan: $( '#FiltTenanCharp' ).val(),
                        clie_cada_empre: $( '#FiltEmpreCharp' ).val(),
                      } }, '../../Laboratorio/Charpy/GetClieCharp/', function( Resposta ){
                        Core.SetSele2( $( '#FiltClieCharp' ), Resposta.registros, function(){
                            Core.SetAjax( { evento: 
                              { fabr_cada_stat: '%%',
                                fabr_cada_tenan: $( '#FiltTenanCharp' ).val(),
                                fabr_cada_empre: $( '#FiltEmpreCharp' ).val(),
                              } }, '../../Laboratorio/Charpy/GetFabrCharp/', function( Resposta ){
                                Core.SetSele2( $( '#FiltFabrCharp' ), Resposta.registros, function(){
                                    Core.SetAjax( { evento: 
                                      { area_cada_stat: '%%',
                                        area_cada_tenan: $( '#FiltTenanCharp' ).val(),
                                        area_cada_empre: $( '#FiltEmpreCharp' ).val(),
                                      } }, '../../Laboratorio/Charpy/GetAreaCharp/', function( Resposta ){
                                        Core.SetSele2( $( '#FiltAreCharp' ), Resposta.registros, function(){
                                            Core.SetMask( '#FiltEmisIniCharp, #FiltEmisFimCharp', 'DATA' );
                                            $( '#FiltEmisIniCharp' ).val ( Core.Data().subtract ( 30, 'days' ).format('L') );
                                            $( '#FiltEmisFimCharp' ).val ( Core.Data().endOf('month').format('L') );
                                            $( '#FiltBtnCharp' ).click();
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
    $(document).off( 'change', '#FiltTenanCharp' );
    $(document).on( 'change', '#FiltTenanCharp', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
          { empre_cada_stat: '%%',
            empre_cada_tenant: $( this ).val() 
          } }, '../../Laboratorio/Charpy/GetEmpreCharp/', function( Resposta ){
            Core.SetSele2( $( '#FiltEmpreCharp' ), Resposta.registros, function(){
                Core.SetAjax( { evento: 
                  { clie_cada_stat: '%%',
                    clie_cada_tenan: $( '#FiltTenanCharp' ).val(),
                    clie_cada_empre: $( '#FiltEmpreCharp' ).val(),
                  } }, '../../Laboratorio/Charpy/GetClieCharp/', function( Resposta ){
                    Core.SetSele2( $( '#FiltClieCharp' ), Resposta.registros, function(){
                        Core.SetAjax( { evento: 
                          { fabr_cada_stat: '%%',
                            fabr_cada_tenan: $( '#FiltTenanCharp' ).val(),
                            fabr_cada_empre: $( '#FiltEmpreCharp' ).val(),
                          } }, '../../Laboratorio/Charpy/GetFabrCharp/', function( Resposta ){
                            Core.SetSele2( $( '#FiltFabrCharp' ), Resposta.registros, function(){
                                Core.SetAjax( { evento: 
                                  { area_cada_stat: '%%',
                                    area_cada_tenan: $( '#FiltTenanCharp' ).val(),
                                    area_cada_empre: $( '#FiltEmpreCharp' ).val(),
                                  } }, '../../Laboratorio/Charpy/GetAreaCharp/', function( Resposta ){
                                    Core.SetSele2( $( '#FiltAreCharp' ), Resposta.registros, function(){
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
    $(document).off( 'change', '#FiltEmpreCharp' );
    $(document).on( 'change', '#FiltEmpreCharp', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
          { clie_cada_stat: '%%',
            clie_cada_tenan: $( '#FiltTenanCharp' ).val(),
            clie_cada_empre: $( '#FiltEmpreCharp' ).val(),
          } }, '../../Laboratorio/Charpy/GetClieCharp/', function( Resposta ){
            Core.SetSele2( $( '#FiltClieCharp' ), Resposta.registros, function(){
                Core.SetAjax( { evento: 
                  { fabr_cada_stat: '%%',
                    fabr_cada_tenan: $( '#FiltTenanCharp' ).val(),
                    fabr_cada_empre: $( '#FiltEmpreCharp' ).val(),
                  } }, '../../Laboratorio/Charpy/GetFabrCharp/', function( Resposta ){
                    Core.SetSele2( $( '#FiltFabrCharp' ), Resposta.registros, function(){
                        Core.SetAjax( { evento: 
                          { area_cada_stat: '%%',
                            area_cada_tenan: $( '#FiltTenanCharp' ).val(),
                            area_cada_empre: $( '#FiltEmpreCharp' ).val(),
                          } }, '../../Laboratorio/Charpy/GetAreaCharp/', function( Resposta ){
                            Core.SetSele2( $( '#FiltAreCharp' ), Resposta.registros, function(){
                                Core.LoadMenu.hide();
                            });
                        });
                    });
                });
            });
        });    
    });
/*--ENTER NO IMPUTS*/
    $(document).off( 'keypress', '#FiltRgCharp, #FiltOsCharp, #FiltEmisIniCharp, #FiltEmisFimCharp' );
    $(document).on( 'keypress', '#FiltRgCharp, #FiltOsCharp, #FiltEmisIniCharp, #FiltEmisFimCharp', function(event){
        if( event.keyCode == 13 ) {
            $( '#FiltBtnCharp' ).click();
        }
    });
/*--EDITA*/
    $(document).off( 'click', '#EditBtnCharp' );
    $(document).on( 'click', '#EditBtnCharp', function(event){
        vLinhSalv = $( this ).parent().parent();
        Core.LoadMenu.show()
        Core.Charpy.GetEdtCharp( this, function( ResObjPai ){
            vTipoOpera = '%%';
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#ResulCharp' ).focus();          
        });
    });
/*--FINALIZA*/
    $(document).off( 'click', '#FinaCharp' );
    $(document).on( 'click', '#FinaCharp', function(event){
        var VThis = $( this );
        Core.GetObjtPai( VThis, [ 'FormCharp' ], function( ResObjPai ){
            if ( $( VThis ).is(':checked') ) {
                $( ResObjPai ).find( '#DatFinaCharp' ).prop( 'disabled', false );
                $( ResObjPai ).find( '#ExcutCharp' ).prop( 'disabled', false );
                $( ResObjPai ).find( '#DatFinaCharp' ).attr( 'data-obriga', 'S' );
                $( ResObjPai ).find( '#ExcutCharp' ).attr( 'data-obriga', 'S' );
                $( ResObjPai ).find( '#DatFinaCharp' ).focus();
                if ( $( ResObjPai ).find( '#DatFinaCharp' ).val() == '' ){
                    $( ResObjPai ).find( '#DatFinaCharp' ).val ( Core.Data().format('L') );
                };
            } else {
                $( ResObjPai ).find( '#DatFinaCharp' ).prop( 'disabled', true );
                $( ResObjPai ).find( '#ExcutCharp' ).prop( 'disabled', true );
                $( ResObjPai ).find( '#DatFinaCharp' ).attr( 'data-obriga', 'N' );
                $( ResObjPai ).find( '#ExcutCharp' ).attr( 'data-obriga', 'N' );
            };
        });
    });
/*--SALVAR*/
    $(document).off( 'click', '#SalvCharp' );
    $(document).on( 'click', '#SalvCharp', function(event){
        var vThis = this;
        Core.LoadMenu.show()
        Core.Charpy.SetSalvCharp( vThis, vLinhSalv, function( Resposta ){
            if ( Resposta.vRespAjax != undefined ){
                if ( Resposta.vRespAjax.status == 'sucesso' ){
                    Core.Charpy.GetCloseCharp( vThis, function(){
                        vFocuCharp = '';
                        $( '#TabCharp' ).click();
                        $( '#FiltBtnCharp' ).click();
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
    $(document).off( 'click', '#FechCharp' );
    $(document).on( 'click', '#FechCharp', function(event){
        Core.LoadMenu.show()
        Core.Charpy.GetCloseCharp( this, function(){
            $( '#TabCharp' ).click();
            $( '#FiltBtnCharp' ).click();
            Core.LoadMenu.hide();
        });
    });
/*--FECHA AVISO*/
    $(document).off( 'hidden.bs.modal', '#MensMenu' );
    $(document).on( 'hidden.bs.modal', '#MensMenu', function(event){
        if ( vFocuCharp != '' ){
            $( vFocuCharp ).select();
            $( vFocuCharp ).focus();
        };
    });
/*--IMPRIMIR*/
    $(document).off( 'click', '#ImprBtnCharp' );
    $(document).on( 'click', '#ImprBtnCharp', function(event){
        var vLinha = $( this ).parent().parent();
        Core.LoadMenu.show()
        Core.Charpy.SetImpreCharp( { 
            evento:{
                IdenCharp: Core.Charpy.GetDataTableCharp( '#TableCharp', vLinha, 'amos_cada_iden' ),
				RGCharp: Core.Charpy.GetDataTableCharp( '#TableCharp', vLinha, 'amos_cada_regi' ), 
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
			      '../../Laboratorio/Charpy/SetExclArqu/', function( vRespAjax ){}
                );
            };            
            $( '#FiltBtnCharp' ).click();
        });
    });
/*--ANEXO INCLUIR*/
    $(document).off( 'click', '#AddAnexBtnCharp' );
    $(document).on( 'click', '#AddAnexBtnCharp', function(event){
        Core.GetObjtPai( this, [ 'AddListCharp', 'EdtListCharp' ], function( ResObjPai ){
            Core.Anexos.GetAddAnex( $( ResObjPai ).find( '#AnexTableCharp' ), function( ResLinhaTabel ){
                $( $( ResObjPai ).find( ResLinhaTabel ) ).find( '#TipoAnexCharp' ).focus();         
            });
        });
    });
/*--ANEXO EXCLUIR*/	
    $(document).off( 'click', '#DeleAnexBtnCharp' );
    $(document).on( 'click', '#DeleAnexBtnCharp', function(){
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
        Core.GetObjtPai( vThisDele, [ 'AddListCharp', 'EdtListCharp' ], function( ResObjPai ){
            Core.Anexos.SetDeleAnex( $( ResObjPai ).find( '#AnexTableCharp' ), vLinhDele, function( vRespAjax ){
                Core.LoadMenu.hide();
            });
        });
    });
/*--ANEXO ARQUIVO UPLOAD*/
    $(document).off( 'change', '#FileAnexCharp' );
    $(document).on( 'change', '#FileAnexCharp', function(e){
        Core.LoadMenu.show()
        var Vthis = this;
        $( this ).parent().find( '#FileAnexLabeCharp' ).html( e.target.files[0].name ) 
        var reader = new FileReader();
        reader.readAsDataURL( e.target.files[0] );
        reader.onload = function () {
            $( Vthis ).attr( 'data-arqu', reader.result );
            Core.LoadMenu.hide();
        };
    });
/*--ANEXO DOWNLOAD*/
    $(document).off( 'click', '#DownAnexBtnCharp' );
    $(document).on('click', '#DownAnexBtnCharp', function(){
        Core.LoadMenu.show() 
        var vIdenCharp = '';
        Core.GetObjtPai( this, [ 'AddListCharp', 'EdtListCharp' ], function( ResObjPai ){
            vIdenCharp = $( ResObjPai ).find( '#IdenCharp' ).val()
        });
        var Param = {
            ArqAnex: $( this ).parent().parent().find( '#FileAnexCharp' ).val().toLowerCase().trim(),
            DadoArqAnex: $( this ).parent().parent().find( '#FileAnexCharp' ).attr( 'data-arqu' ),
            FileAnexLabe: $( this ).parent().parent().find( '#FileAnexLabeCharp' ).html().toLowerCase().trim(),
            IdenCharp: vIdenCharp,
            anexo_ensa_tabe: 'CHARPY',
        };
        Core.Anexos.SetDownAnex( Param, function ( ResObjDonw ){
            Core.LoadMenu.hide();
        })
    });
});
