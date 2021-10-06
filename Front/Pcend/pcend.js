/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../Core/Core.class.js';

$(document).ready(function( ) {
    var vFocuPcend = '';
    var vLinhSalv = '';
    var vTipoOpera = '';
    var vLinhDele = '';
    var vThisDele = '';
/*--FILTRAR*/
    $(document).off( 'click', '#FiltBtnPcend' );
    $(document).on( 'click', '#FiltBtnPcend', function(event){
        Core.LoadMenu.show()
        Core.Pcend.GetTablePcend( '#TablePcend', { 
            evento:{
                'amos_cada_regi': '%' + $( '#FiltRgPcend' ).val() + '%',
				'amos_cada_orse': '%' + $( '#FiltOsPcend' ).val() + '%',
				'amos_cada_emis_ini': $( '#FiltEmisIniPcend' ).val(),
				'amos_cada_emis_fim': $( '#FiltEmisFimPcend' ).val(),
				'amos_cada_clie_iden': $( '#FiltCliePcend' ).val(),
				'amos_cada_fabr_iden': $( '#FiltFabrPcend' ).val(),
				'amos_cada_area_iden': $( '#FiltArePcend' ).val(),
				'amos_cada_tenan': $( '#FiltTenanPcend' ).val(),
				'amos_cada_empre': $( '#FiltEmprePcend' ).val(),
				'amos_macro_cada_fina': '%' + $( '#StatPcend' ).val() + '%',
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
            $( '#FiltRgPcend' ).focus();
        });
    });
/*--INICIALIZAÇÃO*/
    Core.LoadMenu.show();
    Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Laboratorio/Pcend/GetTenanPcend/', function( Resposta ){
        Core.SetSele2( $( '#FiltTenanPcend' ), Resposta.registros, function(){
            $( '#FiltTenanPcend' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
            if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
                $( '#FiltTenanPcend' ).prop( 'disabled', true );
            };
            Core.SetAjax( { evento: 
              { empre_cada_stat: '%%',
                empre_cada_tenant: $( '#FiltTenanPcend' ).val() 
              } }, '../../Laboratorio/Pcend/GetEmprePcend/', function( Resposta ){
                Core.SetSele2( $( '#FiltEmprePcend' ), Resposta.registros, function(){
                    $( '#FiltEmprePcend' ).val( Core.Login.GetUsuaSess( 'usua_cada_empre' ) ).trigger( 'change' );
                    if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
                        $( '#FiltEmprePcend' ).prop( 'disabled', true );
                    };
                    Core.SetAjax( { evento: 
                      { clie_cada_stat: '%%',
                        clie_cada_tenan: $( '#FiltTenanPcend' ).val(),
                        clie_cada_empre: $( '#FiltEmprePcend' ).val(),
                      } }, '../../Laboratorio/Pcend/GetCliePcend/', function( Resposta ){
                        Core.SetSele2( $( '#FiltCliePcend' ), Resposta.registros, function(){
                            Core.SetAjax( { evento: 
                              { fabr_cada_stat: '%%',
                                fabr_cada_tenan: $( '#FiltTenanPcend' ).val(),
                                fabr_cada_empre: $( '#FiltEmprePcend' ).val(),
                              } }, '../../Laboratorio/Pcend/GetFabrPcend/', function( Resposta ){
                                Core.SetSele2( $( '#FiltFabrPcend' ), Resposta.registros, function(){
                                    Core.SetAjax( { evento: 
                                      { area_cada_stat: '%%',
                                        area_cada_tenan: $( '#FiltTenanPcend' ).val(),
                                        area_cada_empre: $( '#FiltEmprePcend' ).val(),
                                      } }, '../../Laboratorio/Pcend/GetAreaPcend/', function( Resposta ){
                                        Core.SetSele2( $( '#FiltArePcend' ), Resposta.registros, function(){
                                            Core.SetMask( '#FiltEmisIniPcend, #FiltEmisFimPcend', 'DATA' );
                                            $( '#FiltEmisIniPcend' ).val ( Core.Data().subtract ( 30, 'days' ).format('L') );
                                            $( '#FiltEmisFimPcend' ).val ( Core.Data().endOf('month').format('L') );
                                            $( '#FiltBtnPcend' ).click();
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
    $(document).off( 'change', '#FiltTenanPcend' );
    $(document).on( 'change', '#FiltTenanPcend', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
          { empre_cada_stat: '%%',
            empre_cada_tenant: $( this ).val() 
          } }, '../../Laboratorio/Pcend/GetEmprePcend/', function( Resposta ){
            Core.SetSele2( $( '#FiltEmprePcend' ), Resposta.registros, function(){
                Core.SetAjax( { evento: 
                  { clie_cada_stat: '%%',
                    clie_cada_tenan: $( '#FiltTenanPcend' ).val(),
                    clie_cada_empre: $( '#FiltEmprePcend' ).val(),
                  } }, '../../Laboratorio/Pcend/GetCliePcend/', function( Resposta ){
                    Core.SetSele2( $( '#FiltCliePcend' ), Resposta.registros, function(){
                        Core.SetAjax( { evento: 
                          { fabr_cada_stat: '%%',
                            fabr_cada_tenan: $( '#FiltTenanPcend' ).val(),
                            fabr_cada_empre: $( '#FiltEmprePcend' ).val(),
                          } }, '../../Laboratorio/Pcend/GetFabrPcend/', function( Resposta ){
                            Core.SetSele2( $( '#FiltFabrPcend' ), Resposta.registros, function(){
                                Core.SetAjax( { evento: 
                                  { area_cada_stat: '%%',
                                    area_cada_tenan: $( '#FiltTenanPcend' ).val(),
                                    area_cada_empre: $( '#FiltEmprePcend' ).val(),
                                  } }, '../../Laboratorio/Pcend/GetAreaPcend/', function( Resposta ){
                                    Core.SetSele2( $( '#FiltArePcend' ), Resposta.registros, function(){
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
    $(document).off( 'change', '#FiltEmprePcend' );
    $(document).on( 'change', '#FiltEmprePcend', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
          { clie_cada_stat: '%%',
            clie_cada_tenan: $( '#FiltTenanPcend' ).val(),
            clie_cada_empre: $( '#FiltEmprePcend' ).val(),
          } }, '../../Laboratorio/Pcend/GetCliePcend/', function( Resposta ){
            Core.SetSele2( $( '#FiltCliePcend' ), Resposta.registros, function(){
                Core.SetAjax( { evento: 
                  { fabr_cada_stat: '%%',
                    fabr_cada_tenan: $( '#FiltTenanPcend' ).val(),
                    fabr_cada_empre: $( '#FiltEmprePcend' ).val(),
                  } }, '../../Laboratorio/Pcend/GetFabrPcend/', function( Resposta ){
                    Core.SetSele2( $( '#FiltFabrPcend' ), Resposta.registros, function(){
                        Core.SetAjax( { evento: 
                          { area_cada_stat: '%%',
                            area_cada_tenan: $( '#FiltTenanPcend' ).val(),
                            area_cada_empre: $( '#FiltEmprePcend' ).val(),
                          } }, '../../Laboratorio/Pcend/GetAreaPcend/', function( Resposta ){
                            Core.SetSele2( $( '#FiltArePcend' ), Resposta.registros, function(){
                                Core.LoadMenu.hide();
                            });
                        });
                    });
                });
            });
        });    
    });
/*--ENTER NO IMPUTS*/
    $(document).off( 'keypress', '#FiltRgPcend, #FiltOsPcend, #FiltEmisIniPcend, #FiltEmisFimPcend' );
    $(document).on( 'keypress', '#FiltRgPcend, #FiltOsPcend, #FiltEmisIniPcend, #FiltEmisFimPcend', function(event){
        if( event.keyCode == 13 ) {
            $( '#FiltBtnPcend' ).click();
        }
    });
/*--EDITA*/
    $(document).off( 'click', '#EditBtnPcend' );
    $(document).on( 'click', '#EditBtnPcend', function(event){
        vLinhSalv = $( this ).parent().parent();
        Core.LoadMenu.show()
        Core.Pcend.GetEdtPcend( this, function( ResObjPai ){
            vTipoOpera = '%%';
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#ResulPcend' ).focus();          
        });
    });
/*--FINALIZA*/
    $(document).off( 'click', '#FinaPcend' );
    $(document).on( 'click', '#FinaPcend', function(event){
        var VThis = $( this );
        Core.GetObjtPai( VThis, [ 'FormPcend' ], function( ResObjPai ){
            if ( $( VThis ).is(':checked') ) {
                $( ResObjPai ).find( '#DatFinaPcend' ).prop( 'disabled', false );
                $( ResObjPai ).find( '#ExcutPcend' ).prop( 'disabled', false );
                $( ResObjPai ).find( '#DatFinaPcend' ).attr( 'data-obriga', 'S' );
                $( ResObjPai ).find( '#ExcutPcend' ).attr( 'data-obriga', 'S' );
                $( ResObjPai ).find( '#DatFinaPcend' ).focus();
                if ( $( ResObjPai ).find( '#DatFinaPcend' ).val() == '' ){
                    $( ResObjPai ).find( '#DatFinaPcend' ).val ( Core.Data().format('L') );
                };
            } else {
                $( ResObjPai ).find( '#DatFinaPcend' ).prop( 'disabled', true );
                $( ResObjPai ).find( '#ExcutPcend' ).prop( 'disabled', true );
                $( ResObjPai ).find( '#DatFinaPcend' ).attr( 'data-obriga', 'N' );
                $( ResObjPai ).find( '#ExcutPcend' ).attr( 'data-obriga', 'N' );
            };
        });
    });
/*--SALVAR*/
    $(document).off( 'click', '#SalvPcend' );
    $(document).on( 'click', '#SalvPcend', function(event){
        var vThis = this;
        Core.LoadMenu.show()
        Core.Pcend.SetSalvPcend( vThis, vLinhSalv, function( Resposta ){
            if ( Resposta.vRespAjax != undefined ){
                if ( Resposta.vRespAjax.status == 'sucesso' ){
                    Core.Pcend.GetClosePcend( vThis, function(){
                        vFocuPcend = '';
                        $( '#TabPcend' ).click();
                        $( '#FiltBtnPcend' ).click();
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
    $(document).off( 'click', '#FechPcend' );
    $(document).on( 'click', '#FechPcend', function(event){
        Core.LoadMenu.show()
        Core.Pcend.GetClosePcend( this, function(){
            $( '#TabPcend' ).click();
            $( '#FiltBtnPcend' ).click();
            Core.LoadMenu.hide();
        });
    });
/*--FECHA AVISO*/
    $(document).off( 'hidden.bs.modal', '#MensMenu' );
    $(document).on( 'hidden.bs.modal', '#MensMenu', function(event){
        if ( vFocuPcend != '' ){
            $( vFocuPcend ).select();
            $( vFocuPcend ).focus();
        };
    });
/*--IMPRIMIR*/
    $(document).off( 'click', '#ImprBtnPcend' );
    $(document).on( 'click', '#ImprBtnPcend', function(event){
        var vLinha = $( this ).parent().parent();
        Core.LoadMenu.show()
        Core.Pcend.SetImprePcend( { 
            evento:{
                IdenPcend: Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'amos_cada_iden' ),
				RGPcend: Core.Pcend.GetDataTablePcend( '#TablePcend', vLinha, 'amos_cada_regi' ), 
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
			      '../../Laboratorio/Pcend/SetExclArqu/', function( vRespAjax ){}
                );
            };            
            $( '#FiltBtnPcend' ).click();
        });
    });
/*--ANEXO INCLUIR*/
    $(document).off( 'click', '#AddAnexBtnPcend' );
    $(document).on( 'click', '#AddAnexBtnPcend', function(event){
        Core.GetObjtPai( this, [ 'AddListPcend', 'EdtListPcend' ], function( ResObjPai ){
            Core.Anexos.GetAddAnex( $( ResObjPai ).find( '#AnexTablePcend' ), function( ResLinhaTabel ){
                $( $( ResObjPai ).find( ResLinhaTabel ) ).find( '#TipoAnexPcend' ).focus();         
            });
        });
    });
/*--ANEXO EXCLUIR*/	
    $(document).off( 'click', '#DeleAnexBtnPcend' );
    $(document).on( 'click', '#DeleAnexBtnPcend', function(){
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
        Core.GetObjtPai( vThisDele, [ 'AddListPcend', 'EdtListPcend' ], function( ResObjPai ){
            Core.Anexos.SetDeleAnex( $( ResObjPai ).find( '#AnexTablePcend' ), vLinhDele, function( vRespAjax ){
                Core.LoadMenu.hide();
            });
        });
    });
/*--ANEXO ARQUIVO UPLOAD*/
    $(document).off( 'change', '#FileAnexPcend' );
    $(document).on( 'change', '#FileAnexPcend', function(e){
        Core.LoadMenu.show()
        var Vthis = this;
        $( this ).parent().find( '#FileAnexLabePcend' ).html( e.target.files[0].name ) 
        var reader = new FileReader();
        reader.readAsDataURL( e.target.files[0] );
        reader.onload = function () {
            $( Vthis ).attr( 'data-arqu', reader.result );
            Core.LoadMenu.hide();
        };
    });
/*--ANEXO DOWNLOAD*/
    $(document).off( 'click', '#DownAnexBtnPcend' );
    $(document).on('click', '#DownAnexBtnPcend', function(){
        Core.LoadMenu.show() 
        var vIdenPcend = '';
        Core.GetObjtPai( this, [ 'AddListPcend', 'EdtListPcend' ], function( ResObjPai ){
            vIdenPcend = $( ResObjPai ).find( '#IdenPcend' ).val()
        });
        var Param = {
            ArqAnex: $( this ).parent().parent().find( '#FileAnexPcend' ).val().toLowerCase().trim(),
            DadoArqAnex: $( this ).parent().parent().find( '#FileAnexPcend' ).attr( 'data-arqu' ),
            FileAnexLabe: $( this ).parent().parent().find( '#FileAnexLabePcend' ).html().toLowerCase().trim(),
            IdenPcend: vIdenPcend,
            anexo_ensa_tabe: 'PCEND',
        };
        Core.Anexos.SetDownAnex( Param, function ( ResObjDonw ){
            Core.LoadMenu.hide();
        })
    });
});
