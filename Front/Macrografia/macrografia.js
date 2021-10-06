/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../Core/Core.class.js';

$(document).ready(function( ) {
    var vFocuMacro = '';
    var vLinhSalv = '';
    var vTipoOpera = '';
    var vLinhDele = '';
    var vThisDele = '';
/*--FILTRAR*/
    $(document).off( 'click', '#FiltBtnMacro' );
    $(document).on( 'click', '#FiltBtnMacro', function(event){
        Core.LoadMenu.show()
        Core.Macrografia.GetTableMacro( '#TableMacro', { 
            evento:{
                'amos_cada_regi': '%' + $( '#FiltRgMacro' ).val() + '%',
				'amos_cada_orse': '%' + $( '#FiltOsMacro' ).val() + '%',
				'amos_cada_emis_ini': $( '#FiltEmisIniMacro' ).val(),
				'amos_cada_emis_fim': $( '#FiltEmisFimMacro' ).val(),
				'amos_cada_clie_iden': $( '#FiltClieMacro' ).val(),
				'amos_cada_fabr_iden': $( '#FiltFabrMacro' ).val(),
				'amos_cada_area_iden': $( '#FiltAreMacro' ).val(),
				'amos_cada_tenan': $( '#FiltTenanMacro' ).val(),
				'amos_cada_empre': $( '#FiltEmpreMacro' ).val(),
				'amos_macro_cada_fina': '%' + $( '#StatMacro' ).val() + '%',
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
            $( '#FiltRgMacro' ).focus();
        });
    });
/*--INICIALIZAÇÃO*/
    Core.LoadMenu.show();
    Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Laboratorio/Macrografia/GetTenanMacro/', function( Resposta ){
        Core.SetSele2( $( '#FiltTenanMacro' ), Resposta.registros, function(){
            $( '#FiltTenanMacro' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
            if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
                $( '#FiltTenanMacro' ).prop( 'disabled', true );
            };
            Core.SetAjax( { evento: 
              { empre_cada_stat: '%%',
                empre_cada_tenant: $( '#FiltTenanMacro' ).val() 
              } }, '../../Laboratorio/Macrografia/GetEmpreMacro/', function( Resposta ){
                Core.SetSele2( $( '#FiltEmpreMacro' ), Resposta.registros, function(){
                    $( '#FiltEmpreMacro' ).val( Core.Login.GetUsuaSess( 'usua_cada_empre' ) ).trigger( 'change' );
                    if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
                        $( '#FiltEmpreMacro' ).prop( 'disabled', true );
                    };
                    Core.SetAjax( { evento: 
                      { clie_cada_stat: '%%',
                        clie_cada_tenan: $( '#FiltTenanMacro' ).val(),
                        clie_cada_empre: $( '#FiltEmpreMacro' ).val(),
                      } }, '../../Laboratorio/Macrografia/GetClieMacro/', function( Resposta ){
                        Core.SetSele2( $( '#FiltClieMacro' ), Resposta.registros, function(){
                            Core.SetAjax( { evento: 
                              { fabr_cada_stat: '%%',
                                fabr_cada_tenan: $( '#FiltTenanMacro' ).val(),
                                fabr_cada_empre: $( '#FiltEmpreMacro' ).val(),
                              } }, '../../Laboratorio/Macrografia/GetFabrMacro/', function( Resposta ){
                                Core.SetSele2( $( '#FiltFabrMacro' ), Resposta.registros, function(){
                                    Core.SetAjax( { evento: 
                                      { area_cada_stat: '%%',
                                        area_cada_tenan: $( '#FiltTenanMacro' ).val(),
                                        area_cada_empre: $( '#FiltEmpreMacro' ).val(),
                                      } }, '../../Laboratorio/Macrografia/GetAreaMacro/', function( Resposta ){
                                        Core.SetSele2( $( '#FiltAreMacro' ), Resposta.registros, function(){
                                            Core.SetMask( '#FiltEmisIniMacro, #FiltEmisFimMacro', 'DATA' );
                                            $( '#FiltEmisIniMacro' ).val ( Core.Data().subtract ( 30, 'days' ).format('L') );
                                            $( '#FiltEmisFimMacro' ).val ( Core.Data().endOf('month').format('L') );
                                            $( '#FiltBtnMacro' ).click();
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
    $(document).off( 'change', '#FiltTenanMacro' );
    $(document).on( 'change', '#FiltTenanMacro', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
          { empre_cada_stat: '%%',
            empre_cada_tenant: $( this ).val() 
          } }, '../../Laboratorio/Macrografia/GetEmpreMacro/', function( Resposta ){
            Core.SetSele2( $( '#FiltEmpreMacro' ), Resposta.registros, function(){
                Core.SetAjax( { evento: 
                  { clie_cada_stat: '%%',
                    clie_cada_tenan: $( '#FiltTenanMacro' ).val(),
                    clie_cada_empre: $( '#FiltEmpreMacro' ).val(),
                  } }, '../../Laboratorio/Macrografia/GetClieMacro/', function( Resposta ){
                    Core.SetSele2( $( '#FiltClieMacro' ), Resposta.registros, function(){
                        Core.SetAjax( { evento: 
                          { fabr_cada_stat: '%%',
                            fabr_cada_tenan: $( '#FiltTenanMacro' ).val(),
                            fabr_cada_empre: $( '#FiltEmpreMacro' ).val(),
                          } }, '../../Laboratorio/Macrografia/GetFabrMacro/', function( Resposta ){
                            Core.SetSele2( $( '#FiltFabrMacro' ), Resposta.registros, function(){
                                Core.SetAjax( { evento: 
                                  { area_cada_stat: '%%',
                                    area_cada_tenan: $( '#FiltTenanMacro' ).val(),
                                    area_cada_empre: $( '#FiltEmpreMacro' ).val(),
                                  } }, '../../Laboratorio/Macrografia/GetAreaMacro/', function( Resposta ){
                                    Core.SetSele2( $( '#FiltAreMacro' ), Resposta.registros, function(){
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
    $(document).off( 'change', '#FiltEmpreMacro' );
    $(document).on( 'change', '#FiltEmpreMacro', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
          { clie_cada_stat: '%%',
            clie_cada_tenan: $( '#FiltTenanMacro' ).val(),
            clie_cada_empre: $( '#FiltEmpreMacro' ).val(),
          } }, '../../Laboratorio/Macrografia/GetClieMacro/', function( Resposta ){
            Core.SetSele2( $( '#FiltClieMacro' ), Resposta.registros, function(){
                Core.SetAjax( { evento: 
                  { fabr_cada_stat: '%%',
                    fabr_cada_tenan: $( '#FiltTenanMacro' ).val(),
                    fabr_cada_empre: $( '#FiltEmpreMacro' ).val(),
                  } }, '../../Laboratorio/Macrografia/GetFabrMacro/', function( Resposta ){
                    Core.SetSele2( $( '#FiltFabrMacro' ), Resposta.registros, function(){
                        Core.SetAjax( { evento: 
                          { area_cada_stat: '%%',
                            area_cada_tenan: $( '#FiltTenanMacro' ).val(),
                            area_cada_empre: $( '#FiltEmpreMacro' ).val(),
                          } }, '../../Laboratorio/Macrografia/GetAreaMacro/', function( Resposta ){
                            Core.SetSele2( $( '#FiltAreMacro' ), Resposta.registros, function(){
                                Core.LoadMenu.hide();
                            });
                        });
                    });
                });
            });
        });    
    });
/*--ENTER NO IMPUTS*/
    $(document).off( 'keypress', '#FiltRgMacro, #FiltOsMacro, #FiltEmisIniMacro, #FiltEmisFimMacro' );
    $(document).on( 'keypress', '#FiltRgMacro, #FiltOsMacro, #FiltEmisIniMacro, #FiltEmisFimMacro', function(event){
        if( event.keyCode == 13 ) {
            $( '#FiltBtnMacro' ).click();
        }
    });
/*--EDITA*/
    $(document).off( 'click', '#EditBtnMacro' );
    $(document).on( 'click', '#EditBtnMacro', function(event){
        vLinhSalv = $( this ).parent().parent();
        Core.LoadMenu.show()
        Core.Macrografia.GetEdtMacro( this, function( ResObjPai ){
            vTipoOpera = '%%';
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#ResulMacro' ).focus();          
        });
    });
/*--FINALIZA*/
    $(document).off( 'click', '#FinaMacro' );
    $(document).on( 'click', '#FinaMacro', function(event){
        var VThis = $( this );
        Core.GetObjtPai( VThis, [ 'FormMacro' ], function( ResObjPai ){
            if ( $( VThis ).is(':checked') ) {
                $( ResObjPai ).find( '#DatFinaMacro' ).prop( 'disabled', false );
                $( ResObjPai ).find( '#ExcutMacro' ).prop( 'disabled', false );
                $( ResObjPai ).find( '#DatFinaMacro' ).attr( 'data-obriga', 'S' );
                $( ResObjPai ).find( '#ExcutMacro' ).attr( 'data-obriga', 'S' );
                $( ResObjPai ).find( '#DatFinaMacro' ).focus();
                if ( $( ResObjPai ).find( '#DatFinaMacro' ).val() == '' ){
                    $( ResObjPai ).find( '#DatFinaMacro' ).val ( Core.Data().format('L') );
                };
            } else {
                $( ResObjPai ).find( '#DatFinaMacro' ).prop( 'disabled', true );
                $( ResObjPai ).find( '#ExcutMacro' ).prop( 'disabled', true );
                $( ResObjPai ).find( '#DatFinaMacro' ).attr( 'data-obriga', 'N' );
                $( ResObjPai ).find( '#ExcutMacro' ).attr( 'data-obriga', 'N' );
            };
        });
    });
/*--SALVAR*/
    $(document).off( 'click', '#SalvMacro' );
    $(document).on( 'click', '#SalvMacro', function(event){
        var vThis = this;
        Core.LoadMenu.show()
        Core.Macrografia.SetSalvMacro( vThis, vLinhSalv, function( Resposta ){
            if ( Resposta.vRespAjax != undefined ){
                if ( Resposta.vRespAjax.status == 'sucesso' ){
                    Core.Macrografia.GetCloseMacro( vThis, function(){
                        vFocuMacro = '';
                        $( '#TabMacro' ).click();
                        $( '#FiltBtnMacro' ).click();
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
    $(document).off( 'click', '#FechMacro' );
    $(document).on( 'click', '#FechMacro', function(event){
        Core.LoadMenu.show()
        Core.Macrografia.GetCloseMacro( this, function(){
            $( '#TabMacro' ).click();
            $( '#FiltBtnMacro' ).click();
            Core.LoadMenu.hide();
        });
    });
/*--FECHA AVISO*/
    $(document).off( 'hidden.bs.modal', '#MensMenu' );
    $(document).on( 'hidden.bs.modal', '#MensMenu', function(event){
        if ( vFocuMacro != '' ){
            $( vFocuMacro ).select();
            $( vFocuMacro ).focus();
        };
    });
/*--IMPRIMIR*/
    $(document).off( 'click', '#ImprBtnMacro' );
    $(document).on( 'click', '#ImprBtnMacro', function(event){
        var vLinha = $( this ).parent().parent();
        Core.LoadMenu.show()
        Core.Macrografia.SetImpreMacro( { 
            evento:{
                IdenMacro: Core.Macrografia.GetDataTableMacro( '#TableMacro', vLinha, 'amos_cada_iden' ),
				RGMacro: Core.Macrografia.GetDataTableMacro( '#TableMacro', vLinha, 'amos_cada_regi' ), 
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
			      '../../Laboratorio/Macrografia/SetExclArqu/', function( vRespAjax ){}
                );
            };            
            $( '#FiltBtnMacro' ).click();
        });
    });
/*--ANEXO INCLUIR*/
    $(document).off( 'click', '#AddAnexBtnMacro' );
    $(document).on( 'click', '#AddAnexBtnMacro', function(event){
        Core.GetObjtPai( this, [ 'AddListMacro', 'EdtListMacro' ], function( ResObjPai ){
            Core.Anexos.GetAddAnex( $( ResObjPai ).find( '#AnexTableMacro' ), function( ResLinhaTabel ){
                $( $( ResObjPai ).find( ResLinhaTabel ) ).find( '#TipoAnexMacro' ).focus();         
            });
        });
    });
/*--ANEXO EXCLUIR*/	
    $(document).off( 'click', '#DeleAnexBtnMacro' );
    $(document).on( 'click', '#DeleAnexBtnMacro', function(){
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
        Core.GetObjtPai( vThisDele, [ 'AddListMacro', 'EdtListMacro' ], function( ResObjPai ){
            Core.Anexos.SetDeleAnex( $( ResObjPai ).find( '#AnexTableMacro' ), vLinhDele, function( vRespAjax ){
                Core.LoadMenu.hide();
            });
        });
    });
/*--ANEXO ARQUIVO UPLOAD*/
    $(document).off( 'change', '#FileAnexMacro' );
    $(document).on( 'change', '#FileAnexMacro', function(e){
        Core.LoadMenu.show()
        var Vthis = this;
        $( this ).parent().find( '#FileAnexLabeMacro' ).html( e.target.files[0].name ) 
        var reader = new FileReader();
        reader.readAsDataURL( e.target.files[0] );
        reader.onload = function () {
            $( Vthis ).attr( 'data-arqu', reader.result );
            Core.LoadMenu.hide();
        };
    });
/*--ANEXO DOWNLOAD*/
    $(document).off( 'click', '#DownAnexBtnMacro' );
    $(document).on('click', '#DownAnexBtnMacro', function(){
        Core.LoadMenu.show() 
        var vIdenMacro = '';
        Core.GetObjtPai( this, [ 'AddListMacro', 'EdtListMacro' ], function( ResObjPai ){
            vIdenMacro = $( ResObjPai ).find( '#IdenMacro' ).val()
        });
        var Param = {
            ArqAnex: $( this ).parent().parent().find( '#FileAnexMacro' ).val().toLowerCase().trim(),
            DadoArqAnex: $( this ).parent().parent().find( '#FileAnexMacro' ).attr( 'data-arqu' ),
            FileAnexLabe: $( this ).parent().parent().find( '#FileAnexLabeMacro' ).html().toLowerCase().trim(),
            IdenMacro: vIdenMacro,
            anexo_ensa_tabe: 'MACROGRAFIA',
        };
        Core.Anexos.SetDownAnex( Param, function ( ResObjDonw ){
            Core.LoadMenu.hide();
        })
    });
});
