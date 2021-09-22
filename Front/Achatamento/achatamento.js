/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../Core/Core.class.js';

$(document).ready(function( ) {
    var vFocuAchat = '';
    var vLinhSalv = '';
    var vTipoOpera = '';
    var vLinhDele = '';
    var vThisDele = '';
/*--FILTRAR*/
    $(document).off( 'click', '#FiltBtnAchat' );
    $(document).on( 'click', '#FiltBtnAchat', function(event){
        Core.LoadMenu.show()
        Core.Achatamento.GetTableAchat( '#TableAchat', { 
            evento:{
                'amos_cada_regi': '%' + $( '#FiltRgAchat' ).val() + '%',
				'amos_cada_orse': '%' + $( '#FiltOsAchat' ).val() + '%',
				'amos_cada_emis_ini': $( '#FiltEmisIniAchat' ).val(),
				'amos_cada_emis_fim': $( '#FiltEmisFimAchat' ).val(),
				'amos_cada_clie_iden': $( '#FiltClieAchat' ).val(),
				'amos_cada_fabr_iden': $( '#FiltFabrAchat' ).val(),
				'amos_cada_area_iden': $( '#FiltAreAchat' ).val(),
				'amos_cada_tenan': $( '#FiltTenanAchat' ).val(),
				'amos_cada_empre': $( '#FiltEmpreAchat' ).val(),
				'amos_achat_cada_fina': '%' + $( '#StatAchat' ).val() + '%',
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
            $( '#FiltRgAchat' ).focus();
        });
    });
/*--INICIALIZAÇÃO*/
    Core.LoadMenu.show();
    Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Achatamento/GetTenanAchat/', function( Resposta ){
        Core.SetSele2( $( '#FiltTenanAchat' ), Resposta.registros, function(){
            $( '#FiltTenanAchat' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
            if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
                $( '#FiltTenanAchat' ).prop( 'disabled', true );
            };
            Core.SetAjax( { evento: 
              { empre_cada_stat: '%%',
                empre_cada_tenant: $( '#FiltTenanAchat' ).val() 
              } }, '../../Achatamento/GetEmpreAchat/', function( Resposta ){
                Core.SetSele2( $( '#FiltEmpreAchat' ), Resposta.registros, function(){
                    $( '#FiltEmpreAchat' ).val( Core.Login.GetUsuaSess( 'usua_cada_empre' ) ).trigger( 'change' );
                    if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
                        $( '#FiltEmpreAchat' ).prop( 'disabled', true );
                    };
                    Core.SetAjax( { evento: 
                      { clie_cada_stat: '%%',
                        clie_cada_tenan: $( '#FiltTenanAchat' ).val(),
                        clie_cada_empre: $( '#FiltEmpreAchat' ).val(),
                      } }, '../../Achatamento/GetClieAchat/', function( Resposta ){
                        Core.SetSele2( $( '#FiltClieAchat' ), Resposta.registros, function(){
                            Core.SetAjax( { evento: 
                              { fabr_cada_stat: '%%',
                                fabr_cada_tenan: $( '#FiltTenanAchat' ).val(),
                                fabr_cada_empre: $( '#FiltEmpreAchat' ).val(),
                              } }, '../../Achatamento/GetFabrAchat/', function( Resposta ){
                                Core.SetSele2( $( '#FiltFabrAchat' ), Resposta.registros, function(){
                                    Core.SetAjax( { evento: 
                                      { area_cada_stat: '%%',
                                        area_cada_tenan: $( '#FiltTenanAchat' ).val(),
                                        area_cada_empre: $( '#FiltEmpreAchat' ).val(),
                                      } }, '../../Achatamento/GetAreaAchat/', function( Resposta ){
                                        Core.SetSele2( $( '#FiltAreAchat' ), Resposta.registros, function(){
                                            Core.SetMask( '#FiltEmisIniAchat, #FiltEmisFimAchat', 'DATA' );
                                            $( '#FiltEmisIniAchat' ).val ( Core.Data().subtract ( 30, 'days' ).format('L') );
                                            $( '#FiltEmisFimAchat' ).val ( Core.Data().endOf('month').format('L') );
                                            $( '#FiltBtnAchat' ).click();
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
    $(document).off( 'change', '#FiltTenanAchat' );
    $(document).on( 'change', '#FiltTenanAchat', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
          { empre_cada_stat: '%%',
            empre_cada_tenant: $( this ).val() 
          } }, '../../Achatamento/GetEmpreAchat/', function( Resposta ){
            Core.SetSele2( $( '#FiltEmpreAchat' ), Resposta.registros, function(){
                Core.SetAjax( { evento: 
                  { clie_cada_stat: '%%',
                    clie_cada_tenan: $( '#FiltTenanAchat' ).val(),
                    clie_cada_empre: $( '#FiltEmpreAchat' ).val(),
                  } }, '../../Achatamento/GetClieAchat/', function( Resposta ){
                    Core.SetSele2( $( '#FiltClieAchat' ), Resposta.registros, function(){
                        Core.SetAjax( { evento: 
                          { fabr_cada_stat: '%%',
                            fabr_cada_tenan: $( '#FiltTenanAchat' ).val(),
                            fabr_cada_empre: $( '#FiltEmpreAchat' ).val(),
                          } }, '../../Achatamento/GetFabrAchat/', function( Resposta ){
                            Core.SetSele2( $( '#FiltFabrAchat' ), Resposta.registros, function(){
                                Core.SetAjax( { evento: 
                                  { area_cada_stat: '%%',
                                    area_cada_tenan: $( '#FiltTenanAchat' ).val(),
                                    area_cada_empre: $( '#FiltEmpreAchat' ).val(),
                                  } }, '../../Achatamento/GetAreaAchat/', function( Resposta ){
                                    Core.SetSele2( $( '#FiltAreAchat' ), Resposta.registros, function(){
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
    $(document).off( 'change', '#FiltEmpreAchat' );
    $(document).on( 'change', '#FiltEmpreAchat', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
          { clie_cada_stat: '%%',
            clie_cada_tenan: $( '#FiltTenanAchat' ).val(),
            clie_cada_empre: $( '#FiltEmpreAchat' ).val(),
          } }, '../../Achatamento/GetClieAchat/', function( Resposta ){
            Core.SetSele2( $( '#FiltClieAchat' ), Resposta.registros, function(){
                Core.SetAjax( { evento: 
                  { fabr_cada_stat: '%%',
                    fabr_cada_tenan: $( '#FiltTenanAchat' ).val(),
                    fabr_cada_empre: $( '#FiltEmpreAchat' ).val(),
                  } }, '../../Achatamento/GetFabrAchat/', function( Resposta ){
                    Core.SetSele2( $( '#FiltFabrAchat' ), Resposta.registros, function(){
                        Core.SetAjax( { evento: 
                          { area_cada_stat: '%%',
                            area_cada_tenan: $( '#FiltTenanAchat' ).val(),
                            area_cada_empre: $( '#FiltEmpreAchat' ).val(),
                          } }, '../../Achatamento/GetAreaAchat/', function( Resposta ){
                            Core.SetSele2( $( '#FiltAreAchat' ), Resposta.registros, function(){
                                Core.LoadMenu.hide();
                            });
                        });
                    });
                });
            });
        });    
    });
/*--ENTER NO IMPUTS*/
    $(document).off( 'keypress', '#FiltRgAchat, #FiltOsAchat, #FiltEmisIniAchat, #FiltEmisFimAchat' );
    $(document).on( 'keypress', '#FiltRgAchat, #FiltOsAchat, #FiltEmisIniAchat, #FiltEmisFimAchat', function(event){
        if( event.keyCode == 13 ) {
            $( '#FiltBtnAchat' ).click();
        }
    });
/*--EDITA*/
    $(document).off( 'click', '#EditBtnAchat' );
    $(document).on( 'click', '#EditBtnAchat', function(event){
        vLinhSalv = $( this ).parent().parent();
        Core.LoadMenu.show()
        Core.Achatamento.GetEdtAchat( this, function( ResObjPai ){
            vTipoOpera = '%%';
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#ResulAchat' ).focus();          
        });
    });
/*--FINALIZA*/
    $(document).off( 'click', '#FinaAchat' );
    $(document).on( 'click', '#FinaAchat', function(event){
        var VThis = $( this );
        Core.GetObjtPai( VThis, [ 'FormAchat' ], function( ResObjPai ){
            if ( $( VThis ).is(':checked') ) {
                $( ResObjPai ).find( '#DatFinaAchat' ).prop( 'disabled', false );
                $( ResObjPai ).find( '#ExcutAchat' ).prop( 'disabled', false );
                $( ResObjPai ).find( '#DatFinaAchat' ).attr( 'data-obriga', 'S' );
                $( ResObjPai ).find( '#ExcutAchat' ).attr( 'data-obriga', 'S' );
                $( ResObjPai ).find( '#DatFinaAchat' ).focus();
                if ( $( ResObjPai ).find( '#DatFinaAchat' ).val() == '' ){
                    $( ResObjPai ).find( '#DatFinaAchat' ).val ( Core.Data().format('L') );
                };
            } else {
                $( ResObjPai ).find( '#DatFinaAchat' ).prop( 'disabled', true );
                $( ResObjPai ).find( '#ExcutAchat' ).prop( 'disabled', true );
                $( ResObjPai ).find( '#DatFinaAchat' ).attr( 'data-obriga', 'N' );
                $( ResObjPai ).find( '#ExcutAchat' ).attr( 'data-obriga', 'N' );
            };
        });
    });
/*--SALVAR*/
    $(document).off( 'click', '#SalvAchat' );
    $(document).on( 'click', '#SalvAchat', function(event){
        var vThis = this;
        Core.LoadMenu.show()
        Core.Achatamento.SetSalvAchat( vThis, vLinhSalv, function( Resposta ){
            if ( Resposta.vRespAjax != undefined ){
                if ( Resposta.vRespAjax.status == 'sucesso' ){
                    Core.Achatamento.GetCloseAchat( vThis, function(){
                        vFocuAchat = '';
                        $( '#TabAchat' ).click();
                        $( '#FiltBtnAchat' ).click();
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
    $(document).off( 'click', '#FechAchat' );
    $(document).on( 'click', '#FechAchat', function(event){
        Core.LoadMenu.show()
        Core.Achatamento.GetCloseAchat( this, function(){
            $( '#TabAchat' ).click();
            $( '#FiltBtnAchat' ).click();
            Core.LoadMenu.hide();
        });
    });
/*--FECHA AVISO*/
    $(document).off( 'hidden.bs.modal', '#MensMenu' );
    $(document).on( 'hidden.bs.modal', '#MensMenu', function(event){
        if ( vFocuAchat != '' ){
            $( vFocuAchat ).select();
            $( vFocuAchat ).focus();
        };
    });
/*--IMPRIMIR*/
    $(document).off( 'click', '#ImprBtnAchat' );
    $(document).on( 'click', '#ImprBtnAchat', function(event){
        var vLinha = $( this ).parent().parent();
        Core.LoadMenu.show()
        Core.Achatamento.SetImpreAchat( { 
            evento:{
                IdenAchat: Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'amos_achat_cada_iden' ),
				RGAchat: Core.Achatamento.GetDataTableAchat( '#TableAchat', vLinha, 'amos_cada_regi' ), 
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
			      '../../Achatamento/SetExclArqu/', function( vRespAjax ){
                });
            };            
            $( '#FiltBtnAchat' ).click();
        });
    });
/*--ANEXO INCLUIR*/
    $(document).off( 'click', '#AddAnexBtnAchat' );
    $(document).on( 'click', '#AddAnexBtnAchat', function(event){
        Core.GetObjtPai( this, [ 'AddListAchat', 'EdtListAchat' ], function( ResObjPai ){
            Core.Anexos.GetAddAnex( $( ResObjPai ).find( '#AnexTableAchat' ), function( ResLinhaTabel ){
                $( $( ResObjPai ).find( ResLinhaTabel ) ).find( '#TipoAnexAchat' ).focus();         
            });
        });
    });
/*--ANEXO EXCLUIR*/	
    $(document).off( 'click', '#DeleAnexBtnAchat' );
    $(document).on( 'click', '#DeleAnexBtnAchat', function(){
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
        Core.GetObjtPai( vThisDele, [ 'AddListAchat', 'EdtListAchat' ], function( ResObjPai ){
            Core.Anexos.SetDeleAnex( $( ResObjPai ).find( '#AnexTableAchat' ), vLinhDele, function( vRespAjax ){
                Core.LoadMenu.hide();
            });
        });
    });
/*--ANEXO ARQUIVO UPLOAD*/
    $(document).off( 'change', '#FileAnexAchat' );
    $(document).on( 'change', '#FileAnexAchat', function(e){
        Core.LoadMenu.show()
        var Vthis = this;
        $( this ).parent().find( '#FileAnexLabeAchat' ).html( e.target.files[0].name ) 
        var reader = new FileReader();
        reader.readAsDataURL( e.target.files[0] );
        reader.onload = function () {
            $( Vthis ).attr( 'data-arqu', reader.result );
            Core.LoadMenu.hide();
        };
    });
/*--ANEXO DOWNLOAD*/
    $(document).off( 'click', '#DownAnexBtnAchat' );
    $(document).on('click', '#DownAnexBtnAchat', function(){
        Core.LoadMenu.show() 
        var vIdenAchat = '';
        Core.GetObjtPai( this, [ 'AddListAchat', 'EdtListAchat' ], function( ResObjPai ){
            vIdenAchat = $( ResObjPai ).find( '#IdenAchat' ).val()
        });
        var Param = {
            ArqAnex: $( this ).parent().parent().find( '#FileAnexAchat' ).val().toLowerCase().trim(),
            DadoArqAnex: $( this ).parent().parent().find( '#FileAnexAchat' ).attr( 'data-arqu' ),
            FileAnexLabe: $( this ).parent().parent().find( '#FileAnexLabeAchat' ).html().toLowerCase().trim(),
            IdenAchat: vIdenAchat,
            anexo_ensa_tabe: 'ACHATAMENTO',
        };
        Core.Anexos.SetDownAnex( Param, function ( ResObjDonw ){
            Core.LoadMenu.hide();
        })
    });
});
