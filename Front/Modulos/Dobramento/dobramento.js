/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../../Core/Core.class.js';

$(document).ready(function( ) {
    var vFocuDobra = '';
    var vLinhSalv = '';
    var vTipoOpera = '';
    var vLinhDele = '';
    var vThisDele = '';
/*--FILTRAR*/
    $(document).off( 'click', '#FiltBtnDobra' );
    $(document).on( 'click', '#FiltBtnDobra', function(event){
        Core.LoadMenu.show()
        Core.Dobramento.GetTableDobra( '#TableDobra', { 
            evento:{
                'amos_cada_regi': '%' + $( '#FiltRgDobra' ).val() + '%',
				'amos_cada_orse': '%' + $( '#FiltOsDobra' ).val() + '%',
				'amos_cada_emis_ini': $( '#FiltEmisIniDobra' ).val(),
				'amos_cada_emis_fim': $( '#FiltEmisFimDobra' ).val(),
				'amos_cada_clie_iden': $( '#FiltClieDobra' ).val(),
				'amos_cada_fabr_iden': $( '#FiltFabrDobra' ).val(),
				'amos_cada_area_iden': $( '#FiltAreDobra' ).val(),
				'amos_cada_tenan': $( '#FiltTenanDobra' ).val(),
				'amos_cada_empre': $( '#FiltEmpreDobra' ).val(),
				'amos_dobra_cada_fina': '%' + $( '#StatDobra' ).val() + '%',
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
            $( '#FiltRgDobra' ).focus();
        });
    });
/*--INICIALIZAÇÃO*/
    Core.LoadMenu.show();
    Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Laboratorio/Dobramento/GetTenanDobra/', function( Resposta ){
        Core.SetSele2( $( '#FiltTenanDobra' ), Resposta.registros, function(){
            $( '#FiltTenanDobra' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
            if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
                $( '#FiltTenanDobra' ).prop( 'disabled', true );
            };
            Core.SetAjax( { evento: 
              { empre_cada_stat: '%%',
                empre_cada_tenant: $( '#FiltTenanDobra' ).val() 
              } }, '../../Laboratorio/Dobramento/GetEmpreDobra/', function( Resposta ){
                Core.SetSele2( $( '#FiltEmpreDobra' ), Resposta.registros, function(){
                    $( '#FiltEmpreDobra' ).val( Core.Login.GetUsuaSess( 'usua_cada_empre' ) ).trigger( 'change' );
                    if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
                        $( '#FiltEmpreDobra' ).prop( 'disabled', true );
                    };
                    Core.SetAjax( { evento: 
                      { clie_cada_stat: '%%',
                        clie_cada_tenan: $( '#FiltTenanDobra' ).val(),
                        clie_cada_empre: $( '#FiltEmpreDobra' ).val(),
                      } }, '../../Laboratorio/Dobramento/GetClieDobra/', function( Resposta ){
                        Core.SetSele2( $( '#FiltClieDobra' ), Resposta.registros, function(){
                            Core.SetAjax( { evento: 
                              { fabr_cada_stat: '%%',
                                fabr_cada_tenan: $( '#FiltTenanDobra' ).val(),
                                fabr_cada_empre: $( '#FiltEmpreDobra' ).val(),
                              } }, '../../Laboratorio/Dobramento/GetFabrDobra/', function( Resposta ){
                                Core.SetSele2( $( '#FiltFabrDobra' ), Resposta.registros, function(){
                                    Core.SetAjax( { evento: 
                                      { area_cada_stat: '%%',
                                        area_cada_tenan: $( '#FiltTenanDobra' ).val(),
                                        area_cada_empre: $( '#FiltEmpreDobra' ).val(),
                                      } }, '../../Laboratorio/Dobramento/GetAreaDobra/', function( Resposta ){
                                        Core.SetSele2( $( '#FiltAreDobra' ), Resposta.registros, function(){
                                            Core.SetMask( '#FiltEmisIniDobra, #FiltEmisFimDobra', 'DATA' );
                                            $( '#FiltEmisIniDobra' ).val ( Core.Data().subtract ( 30, 'days' ).format('L') );
                                            $( '#FiltEmisFimDobra' ).val ( Core.Data().endOf('month').format('L') );
                                            $( '#FiltBtnDobra' ).click();
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
    $(document).off( 'change', '#FiltTenanDobra' );
    $(document).on( 'change', '#FiltTenanDobra', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
          { empre_cada_stat: '%%',
            empre_cada_tenant: $( this ).val() 
          } }, '../../Laboratorio/Dobramento/GetEmpreDobra/', function( Resposta ){
            Core.SetSele2( $( '#FiltEmpreDobra' ), Resposta.registros, function(){
                Core.SetAjax( { evento: 
                  { clie_cada_stat: '%%',
                    clie_cada_tenan: $( '#FiltTenanDobra' ).val(),
                    clie_cada_empre: $( '#FiltEmpreDobra' ).val(),
                  } }, '../../Laboratorio/Dobramento/GetClieDobra/', function( Resposta ){
                    Core.SetSele2( $( '#FiltClieDobra' ), Resposta.registros, function(){
                        Core.SetAjax( { evento: 
                          { fabr_cada_stat: '%%',
                            fabr_cada_tenan: $( '#FiltTenanDobra' ).val(),
                            fabr_cada_empre: $( '#FiltEmpreDobra' ).val(),
                          } }, '../../Laboratorio/Dobramento/GetFabrDobra/', function( Resposta ){
                            Core.SetSele2( $( '#FiltFabrDobra' ), Resposta.registros, function(){
                                Core.SetAjax( { evento: 
                                  { area_cada_stat: '%%',
                                    area_cada_tenan: $( '#FiltTenanDobra' ).val(),
                                    area_cada_empre: $( '#FiltEmpreDobra' ).val(),
                                  } }, '../../Laboratorio/Dobramento/GetAreaDobra/', function( Resposta ){
                                    Core.SetSele2( $( '#FiltAreDobra' ), Resposta.registros, function(){
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
    $(document).off( 'change', '#FiltEmpreDobra' );
    $(document).on( 'change', '#FiltEmpreDobra', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
          { clie_cada_stat: '%%',
            clie_cada_tenan: $( '#FiltTenanDobra' ).val(),
            clie_cada_empre: $( '#FiltEmpreDobra' ).val(),
          } }, '../../Laboratorio/Dobramento/GetClieDobra/', function( Resposta ){
            Core.SetSele2( $( '#FiltClieDobra' ), Resposta.registros, function(){
                Core.SetAjax( { evento: 
                  { fabr_cada_stat: '%%',
                    fabr_cada_tenan: $( '#FiltTenanDobra' ).val(),
                    fabr_cada_empre: $( '#FiltEmpreDobra' ).val(),
                  } }, '../../Laboratorio/Dobramento/GetFabrDobra/', function( Resposta ){
                    Core.SetSele2( $( '#FiltFabrDobra' ), Resposta.registros, function(){
                        Core.SetAjax( { evento: 
                          { area_cada_stat: '%%',
                            area_cada_tenan: $( '#FiltTenanDobra' ).val(),
                            area_cada_empre: $( '#FiltEmpreDobra' ).val(),
                          } }, '../../Laboratorio/Dobramento/GetAreaDobra/', function( Resposta ){
                            Core.SetSele2( $( '#FiltAreDobra' ), Resposta.registros, function(){
                                Core.LoadMenu.hide();
                            });
                        });
                    });
                });
            });
        });    
    });
/*--ENTER NO IMPUTS*/
    $(document).off( 'keypress', '#FiltRgDobra, #FiltOsDobra, #FiltEmisIniDobra, #FiltEmisFimDobra' );
    $(document).on( 'keypress', '#FiltRgDobra, #FiltOsDobra, #FiltEmisIniDobra, #FiltEmisFimDobra', function(event){
        if( event.keyCode == 13 ) {
            $( '#FiltBtnDobra' ).click();
        }
    });
/*--EDITA*/
    $(document).off( 'click', '#EditBtnDobra' );
    $(document).on( 'click', '#EditBtnDobra', function(event){
        vLinhSalv = $( this ).parent().parent();
        Core.LoadMenu.show()
        Core.Dobramento.GetEdtDobra( this, function( ResObjPai ){
            vTipoOpera = '%%';
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#ResulDobra' ).focus();          
        });
    });
/*--FINALIZA*/
    $(document).off( 'click', '#FinaDobra' );
    $(document).on( 'click', '#FinaDobra', function(event){
        var VThis = $( this );
        Core.GetObjtPai( VThis, [ 'FormDobra' ], function( ResObjPai ){
            if ( $( VThis ).is(':checked') ) {
                $( ResObjPai ).find( '#DatFinaDobra' ).prop( 'disabled', false );
                $( ResObjPai ).find( '#ExcutDobra' ).prop( 'disabled', false );
                $( ResObjPai ).find( '#DatFinaDobra' ).attr( 'data-obriga', 'S' );
                $( ResObjPai ).find( '#ExcutDobra' ).attr( 'data-obriga', 'S' );
                $( ResObjPai ).find( '#DatFinaDobra' ).focus();
                if ( $( ResObjPai ).find( '#DatFinaDobra' ).val() == '' ){
                    $( ResObjPai ).find( '#DatFinaDobra' ).val ( Core.Data().format('L') );
                };
            } else {
                $( ResObjPai ).find( '#DatFinaDobra' ).prop( 'disabled', true );
                $( ResObjPai ).find( '#ExcutDobra' ).prop( 'disabled', true );
                $( ResObjPai ).find( '#DatFinaDobra' ).attr( 'data-obriga', 'N' );
                $( ResObjPai ).find( '#ExcutDobra' ).attr( 'data-obriga', 'N' );
            };
        });
    });
/*--SALVAR*/
    $(document).off( 'click', '#SalvDobra' );
    $(document).on( 'click', '#SalvDobra', function(event){
        var vThis = this;
        Core.LoadMenu.show()
        Core.Dobramento.SetSalvDobra( vThis, vLinhSalv, function( Resposta ){
            if ( Resposta.vRespAjax != undefined ){
                if ( Resposta.vRespAjax.status == 'sucesso' ){
                    Core.Dobramento.GetCloseDobra( vThis, function(){
                        vFocuDobra = '';
                        $( '#TabDobra' ).click();
                        $( '#FiltBtnDobra' ).click();
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
    $(document).off( 'click', '#FechDobra' );
    $(document).on( 'click', '#FechDobra', function(event){
        Core.LoadMenu.show()
        Core.Dobramento.GetCloseDobra( this, function(){
            $( '#TabDobra' ).click();
            $( '#FiltBtnDobra' ).click();
            Core.LoadMenu.hide();
        });
    });
/*--FECHA AVISO*/
    $(document).off( 'hidden.bs.modal', '#MensMenu' );
    $(document).on( 'hidden.bs.modal', '#MensMenu', function(event){
        if ( vFocuDobra != '' ){
            $( vFocuDobra ).select();
            $( vFocuDobra ).focus();
        };
    });
/*--IMPRIMIR*/
    $(document).off( 'click', '#ImprBtnDobra' );
    $(document).on( 'click', '#ImprBtnDobra', function(event){
        var vLinha = $( this ).parent().parent();
        Core.LoadMenu.show()
        Core.Dobramento.SetImpreDobra( { 
            evento:{
                IdenDobra: Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'amos_cada_iden' ),
				RGDobra: Core.Dobramento.GetDataTableDobra( '#TableDobra', vLinha, 'amos_cada_regi' ), 
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
			      '../../Laboratorio/Dobramento/SetExclArqu/', function( vRespAjax ){}
                );
            };            
            $( '#FiltBtnDobra' ).click();
        });
    });
/*--ANEXO INCLUIR*/
    $(document).off( 'click', '#AddAnexBtnDobra' );
    $(document).on( 'click', '#AddAnexBtnDobra', function(event){
        Core.GetObjtPai( this, [ 'AddListDobra', 'EdtListDobra' ], function( ResObjPai ){
            Core.Anexos.GetAddAnex( $( ResObjPai ).find( '#AnexTableDobra' ), function( ResLinhaTabel ){
                $( $( ResObjPai ).find( ResLinhaTabel ) ).find( '#TipoAnexDobra' ).focus();         
            });
        });
    });
/*--ANEXO EXCLUIR*/	
    $(document).off( 'click', '#DeleAnexBtnDobra' );
    $(document).on( 'click', '#DeleAnexBtnDobra', function(){
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
        Core.GetObjtPai( vThisDele, [ 'AddListDobra', 'EdtListDobra' ], function( ResObjPai ){
            Core.Anexos.SetDeleAnex( $( ResObjPai ).find( '#AnexTableDobra' ), vLinhDele, function( vRespAjax ){
                Core.LoadMenu.hide();
            });
        });
    });
/*--ANEXO ARQUIVO UPLOAD*/
    $(document).off( 'change', '#FileAnexDobra' );
    $(document).on( 'change', '#FileAnexDobra', function(e){
        Core.LoadMenu.show()
        var Vthis = this;
        $( this ).parent().find( '#FileAnexLabeDobra' ).html( e.target.files[0].name ) 
        var reader = new FileReader();
        reader.readAsDataURL( e.target.files[0] );
        reader.onload = function () {
            $( Vthis ).attr( 'data-arqu', reader.result );
            Core.LoadMenu.hide();
        };
    });
/*--ANEXO DOWNLOAD*/
    $(document).off( 'click', '#DownAnexBtnDobra' );
    $(document).on('click', '#DownAnexBtnDobra', function(){
        Core.LoadMenu.show() 
        var vIdenDobra = '';
        Core.GetObjtPai( this, [ 'AddListDobra', 'EdtListDobra' ], function( ResObjPai ){
            vIdenDobra = $( ResObjPai ).find( '#IdenDobra' ).val()
        });
        var Param = {
            ArqAnex: $( this ).parent().parent().find( '#FileAnexDobra' ).val().toLowerCase().trim(),
            DadoArqAnex: $( this ).parent().parent().find( '#FileAnexDobra' ).attr( 'data-arqu' ),
            FileAnexLabe: $( this ).parent().parent().find( '#FileAnexLabeDobra' ).html().toLowerCase().trim(),
            IdenDobra: vIdenDobra,
            anexo_ensa_tabe: 'DOBRAMENTO',
        };
        Core.Anexos.SetDownAnex( Param, function ( ResObjDonw ){
            Core.LoadMenu.hide();
        })
    });
});
