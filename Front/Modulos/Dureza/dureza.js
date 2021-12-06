/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../Core/Core.class.js';

$(document).ready(function( ) {
    var vFocuDure = '';
    var vLinhSalv = '';
    var vTipoOpera = '';
    var vLinhDele = '';
    var vThisDele = '';
/*--FILTRAR*/
    $(document).off( 'click', '#FiltBtnDure' );
    $(document).on( 'click', '#FiltBtnDure', function(event){
        Core.LoadMenu.show()
        Core.Dureza.GetTableDure( '#TableDure', { 
            evento:{
                'amos_cada_regi': '%' + $( '#FiltRgDure' ).val() + '%',
				'amos_cada_orse': '%' + $( '#FiltOsDure' ).val() + '%',
				'amos_cada_emis_ini': $( '#FiltEmisIniDure' ).val(),
				'amos_cada_emis_fim': $( '#FiltEmisFimDure' ).val(),
				'amos_cada_clie_iden': $( '#FiltClieDure' ).val(),
				'amos_cada_fabr_iden': $( '#FiltFabrDure' ).val(),
				'amos_cada_area_iden': $( '#FiltAreDure' ).val(),
				'amos_cada_tenan': $( '#FiltTenanDure' ).val(),
				'amos_cada_empre': $( '#FiltEmpreDure' ).val(),
				'amos_dure_cada_fina': '%' + $( '#StatDure' ).val() + '%',
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
            $( '#FiltRgDure' ).focus();
        });
    });
/*--INICIALIZAÇÃO*/
    Core.LoadMenu.show();
    Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Laboratorio/Dureza/GetTenanDure/', function( Resposta ){
        Core.SetSele2( $( '#FiltTenanDure' ), Resposta.registros, function(){
            $( '#FiltTenanDure' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
            if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
                $( '#FiltTenanDure' ).prop( 'disabled', true );
            };
            Core.SetAjax( { evento: 
              { empre_cada_stat: '%%',
                empre_cada_tenant: $( '#FiltTenanDure' ).val() 
              } }, '../../Laboratorio/Dureza/GetEmpreDure/', function( Resposta ){
                Core.SetSele2( $( '#FiltEmpreDure' ), Resposta.registros, function(){
                    $( '#FiltEmpreDure' ).val( Core.Login.GetUsuaSess( 'usua_cada_empre' ) ).trigger( 'change' );
                    if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
                        $( '#FiltEmpreDure' ).prop( 'disabled', true );
                    };
                    Core.SetAjax( { evento: 
                      { clie_cada_stat: '%%',
                        clie_cada_tenan: $( '#FiltTenanDure' ).val(),
                        clie_cada_empre: $( '#FiltEmpreDure' ).val(),
                      } }, '../../Laboratorio/Dureza/GetClieDure/', function( Resposta ){
                        Core.SetSele2( $( '#FiltClieDure' ), Resposta.registros, function(){
                            Core.SetAjax( { evento: 
                              { fabr_cada_stat: '%%',
                                fabr_cada_tenan: $( '#FiltTenanDure' ).val(),
                                fabr_cada_empre: $( '#FiltEmpreDure' ).val(),
                              } }, '../../Laboratorio/Dureza/GetFabrDure/', function( Resposta ){
                                Core.SetSele2( $( '#FiltFabrDure' ), Resposta.registros, function(){
                                    Core.SetAjax( { evento: 
                                      { area_cada_stat: '%%',
                                        area_cada_tenan: $( '#FiltTenanDure' ).val(),
                                        area_cada_empre: $( '#FiltEmpreDure' ).val(),
                                      } }, '../../Laboratorio/Dureza/GetAreaDure/', function( Resposta ){
                                        Core.SetSele2( $( '#FiltAreDure' ), Resposta.registros, function(){
                                            Core.SetMask( '#FiltEmisIniDure, #FiltEmisFimDure', 'DATA' );
                                            $( '#FiltEmisIniDure' ).val ( Core.Data().subtract ( 30, 'days' ).format('L') );
                                            $( '#FiltEmisFimDure' ).val ( Core.Data().endOf('month').format('L') );
                                            $( '#FiltBtnDure' ).click();
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
    $(document).off( 'change', '#FiltTenanDure' );
    $(document).on( 'change', '#FiltTenanDure', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
          { empre_cada_stat: '%%',
            empre_cada_tenant: $( this ).val() 
          } }, '../../Laboratorio/Dureza/GetEmpreDure/', function( Resposta ){
            Core.SetSele2( $( '#FiltEmpreDure' ), Resposta.registros, function(){
                Core.SetAjax( { evento: 
                  { clie_cada_stat: '%%',
                    clie_cada_tenan: $( '#FiltTenanDure' ).val(),
                    clie_cada_empre: $( '#FiltEmpreDure' ).val(),
                  } }, '../../Laboratorio/Dureza/GetClieDure/', function( Resposta ){
                    Core.SetSele2( $( '#FiltClieDure' ), Resposta.registros, function(){
                        Core.SetAjax( { evento: 
                          { fabr_cada_stat: '%%',
                            fabr_cada_tenan: $( '#FiltTenanDure' ).val(),
                            fabr_cada_empre: $( '#FiltEmpreDure' ).val(),
                          } }, '../../Laboratorio/Dureza/GetFabrDure/', function( Resposta ){
                            Core.SetSele2( $( '#FiltFabrDure' ), Resposta.registros, function(){
                                Core.SetAjax( { evento: 
                                  { area_cada_stat: '%%',
                                    area_cada_tenan: $( '#FiltTenanDure' ).val(),
                                    area_cada_empre: $( '#FiltEmpreDure' ).val(),
                                  } }, '../../Laboratorio/Dureza/GetAreaDure/', function( Resposta ){
                                    Core.SetSele2( $( '#FiltAreDure' ), Resposta.registros, function(){
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
    $(document).off( 'change', '#FiltEmpreDure' );
    $(document).on( 'change', '#FiltEmpreDure', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
          { clie_cada_stat: '%%',
            clie_cada_tenan: $( '#FiltTenanDure' ).val(),
            clie_cada_empre: $( '#FiltEmpreDure' ).val(),
          } }, '../../Laboratorio/Dureza/GetClieDure/', function( Resposta ){
            Core.SetSele2( $( '#FiltClieDure' ), Resposta.registros, function(){
                Core.SetAjax( { evento: 
                  { fabr_cada_stat: '%%',
                    fabr_cada_tenan: $( '#FiltTenanDure' ).val(),
                    fabr_cada_empre: $( '#FiltEmpreDure' ).val(),
                  } }, '../../Laboratorio/Dureza/GetFabrDure/', function( Resposta ){
                    Core.SetSele2( $( '#FiltFabrDure' ), Resposta.registros, function(){
                        Core.SetAjax( { evento: 
                          { area_cada_stat: '%%',
                            area_cada_tenan: $( '#FiltTenanDure' ).val(),
                            area_cada_empre: $( '#FiltEmpreDure' ).val(),
                          } }, '../../Laboratorio/Dureza/GetAreaDure/', function( Resposta ){
                            Core.SetSele2( $( '#FiltAreDure' ), Resposta.registros, function(){
                                Core.LoadMenu.hide();
                            });
                        });
                    });
                });
            });
        });    
    });
/*--ENTER NO IMPUTS*/
    $(document).off( 'keypress', '#FiltRgDure, #FiltOsDure, #FiltEmisIniDure, #FiltEmisFimDure' );
    $(document).on( 'keypress', '#FiltRgDure, #FiltOsDure, #FiltEmisIniDure, #FiltEmisFimDure', function(event){
        if( event.keyCode == 13 ) {
            $( '#FiltBtnDure' ).click();
        }
    });
/*--EDITA*/
    $(document).off( 'click', '#EditBtnDure' );
    $(document).on( 'click', '#EditBtnDure', function(event){
        vLinhSalv = $( this ).parent().parent();
        Core.LoadMenu.show()
        Core.Dureza.GetEdtDure( this, function( ResObjPai ){
            vTipoOpera = '%%';
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#ResulDure' ).focus();          
        });
    });
/*--FINALIZA*/
    $(document).off( 'click', '#FinaDure' );
    $(document).on( 'click', '#FinaDure', function(event){
        var VThis = $( this );
        Core.GetObjtPai( VThis, [ 'FormDure' ], function( ResObjPai ){
            if ( $( VThis ).is(':checked') ) {
                $( ResObjPai ).find( '#DatFinaDure' ).prop( 'disabled', false );
                $( ResObjPai ).find( '#ExcutDure' ).prop( 'disabled', false );
                $( ResObjPai ).find( '#DatFinaDure' ).attr( 'data-obriga', 'S' );
                $( ResObjPai ).find( '#ExcutDure' ).attr( 'data-obriga', 'S' );
                $( ResObjPai ).find( '#DatFinaDure' ).focus();
                if ( $( ResObjPai ).find( '#DatFinaDure' ).val() == '' ){
                    $( ResObjPai ).find( '#DatFinaDure' ).val ( Core.Data().format('L') );
                };
            } else {
                $( ResObjPai ).find( '#DatFinaDure' ).prop( 'disabled', true );
                $( ResObjPai ).find( '#ExcutDure' ).prop( 'disabled', true );
                $( ResObjPai ).find( '#DatFinaDure' ).attr( 'data-obriga', 'N' );
                $( ResObjPai ).find( '#ExcutDure' ).attr( 'data-obriga', 'N' );
            };
        });
    });
/*--SALVAR*/
    $(document).off( 'click', '#SalvDure' );
    $(document).on( 'click', '#SalvDure', function(event){
        var vThis = this;
        Core.LoadMenu.show()
        Core.Dureza.SetSalvDure( vThis, vLinhSalv, function( Resposta ){
            if ( Resposta.vRespAjax != undefined ){
                if ( Resposta.vRespAjax.status == 'sucesso' ){
                    Core.Dureza.GetCloseDure( vThis, function(){
                        vFocuDure = '';
                        $( '#TabDure' ).click();
                        $( '#FiltBtnDure' ).click();
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
    $(document).off( 'click', '#FechDure' );
    $(document).on( 'click', '#FechDure', function(event){
        Core.LoadMenu.show()
        Core.Dureza.GetCloseDure( this, function(){
            $( '#TabDure' ).click();
            $( '#FiltBtnDure' ).click();
            Core.LoadMenu.hide();
        });
    });
/*--FECHA AVISO*/
    $(document).off( 'hidden.bs.modal', '#MensMenu' );
    $(document).on( 'hidden.bs.modal', '#MensMenu', function(event){
        if ( vFocuDure != '' ){
            $( vFocuDure ).select();
            $( vFocuDure ).focus();
        };
    });
/*--IMPRIMIR*/
    $(document).off( 'click', '#ImprBtnDure' );
    $(document).on( 'click', '#ImprBtnDure', function(event){
        var vLinha = $( this ).parent().parent();
        Core.LoadMenu.show()
        Core.Dureza.SetImpreDure( { 
            evento:{
                IdenDure: Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_cada_iden' ),
				RGDure: Core.Dureza.GetDataTableDure( '#TableDure', vLinha, 'amos_cada_regi' ), 
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
			      '../../Laboratorio/Dureza/SetExclArqu/', function( vRespAjax ){}
                );
            };            
            $( '#FiltBtnDure' ).click();
        });
    });
/*--ANEXO INCLUIR*/
    $(document).off( 'click', '#AddAnexBtnDure' );
    $(document).on( 'click', '#AddAnexBtnDure', function(event){
        Core.GetObjtPai( this, [ 'AddListDure', 'EdtListDure' ], function( ResObjPai ){
            Core.Anexos.GetAddAnex( $( ResObjPai ).find( '#AnexTableDure' ), function( ResLinhaTabel ){
                $( $( ResObjPai ).find( ResLinhaTabel ) ).find( '#TipoAnexDure' ).focus();         
            });
        });
    });
/*--ANEXO EXCLUIR*/	
    $(document).off( 'click', '#DeleAnexBtnDure' );
    $(document).on( 'click', '#DeleAnexBtnDure', function(){
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
        Core.GetObjtPai( vThisDele, [ 'AddListDure', 'EdtListDure' ], function( ResObjPai ){
            Core.Anexos.SetDeleAnex( $( ResObjPai ).find( '#AnexTableDure' ), vLinhDele, function( vRespAjax ){
                Core.LoadMenu.hide();
            });
        });
    });
/*--ANEXO ARQUIVO UPLOAD*/
    $(document).off( 'change', '#FileAnexDure' );
    $(document).on( 'change', '#FileAnexDure', function(e){
        Core.LoadMenu.show()
        var Vthis = this;
        $( this ).parent().find( '#FileAnexLabeDure' ).html( e.target.files[0].name ) 
        var reader = new FileReader();
        reader.readAsDataURL( e.target.files[0] );
        reader.onload = function () {
            $( Vthis ).attr( 'data-arqu', reader.result );
            Core.LoadMenu.hide();
        };
    });
/*--ANEXO DOWNLOAD*/
    $(document).off( 'click', '#DownAnexBtnDure' );
    $(document).on('click', '#DownAnexBtnDure', function(){
        Core.LoadMenu.show() 
        var vIdenDure = '';
        Core.GetObjtPai( this, [ 'AddListDure', 'EdtListDure' ], function( ResObjPai ){
            vIdenDure = $( ResObjPai ).find( '#IdenDure' ).val()
        });
        var Param = {
            ArqAnex: $( this ).parent().parent().find( '#FileAnexDure' ).val().toLowerCase().trim(),
            DadoArqAnex: $( this ).parent().parent().find( '#FileAnexDure' ).attr( 'data-arqu' ),
            FileAnexLabe: $( this ).parent().parent().find( '#FileAnexLabeDure' ).html().toLowerCase().trim(),
            IdenDure: vIdenDure,
            anexo_ensa_tabe: 'DUREZA',
        };
        Core.Anexos.SetDownAnex( Param, function ( ResObjDonw ){
            Core.LoadMenu.hide();
        })
    });
});
