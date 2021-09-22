/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../Core/Core.class.js';

$(document).ready(function( ) {
    var vFocuArea = '';
    var vThisPerg = '';
    /*--FILTRAR*/
    $(document).off( 'click', '#FiltBtnArea' );
    $(document).on( 'click', '#FiltBtnArea', function(event){
        Core.LoadMenu.show()
        Core.Areas.GetTableArea( '#TableArea', { 
            evento:{
                area_cada_tenan: $( '#FiltTenanArea' ).val(),
                area_cada_empre: $( '#FiltEmpreArea' ).val(),
                area_cada_descr_refe: '%' + $( '#FiltDadoArea' ).val() + '%',
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
            $( '#FiltDadoArea' ).focus();
        });
    });
    /*--INICIALIZAÇÃO*/
    Core.LoadMenu.show();
    Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Areas/GetTenanArea/', function( Resposta ){
        Core.SetSele2( $( '#FiltTenanArea' ), Resposta.registros, function(){
            $( '#FiltTenanArea' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
            if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
                $( '#FiltTenanArea' ).prop( 'disabled', true );
            };
            Core.SetAjax( { evento: 
              { empre_cada_stat: '%%',
                empre_cada_tenant: $( '#FiltTenanArea' ).val() 
              } }, '../../Areas/GetEmpreArea/', function( Resposta ){
                Core.SetSele2( $( '#FiltEmpreArea' ), Resposta.registros, function(){
                    $( '#FiltEmpreArea' ).val( Core.Login.GetUsuaSess( 'usua_cada_empre' ) ).trigger( 'change' );
                    if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
                        $( '#FiltEmpreArea' ).prop( 'disabled', true );
                    };
                    $( '#FiltBtnArea' ).click();
                });
            });
        });
    });
    /*--FILTRO TENANT*/
    $(document).off( 'change', '#FiltTenanArea' );
    $(document).on( 'change', '#FiltTenanArea', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
           { empre_cada_stat: '%%',
             empre_cada_tenant: $( this ).val() 
           } }, '../../Areas/GetEmpreArea/', function( Resposta ){
            Core.SetSele2( $( '#FiltEmpreArea' ), Resposta.registros, function(){
                Core.LoadMenu.hide();
            });
        });    
    });
    /*--ENTER NO IMPUTS*/
    $(document).off( 'keypress', '#FiltDadoArea' );
    $(document).on( 'keypress', '#FiltDadoArea', function(event){
        if( event.keyCode == 13 ) {
            $( '#FiltBtnArea' ).click();
        }
    });
    /*--ADICIONA*/
    $(document).off( 'click', '#AddBtnArea' );
    $(document).on( 'click', '#AddBtnArea', function(event){
        Core.LoadMenu.show()
        Core.Areas.GetAddArea( this, function( ResObjPai ){
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#RefeArea' ).focus();
        });
    });
    /*--EDITA*/
    $(document).off( 'click', '#EditBtnArea' );
    $(document).on( 'click', '#EditBtnArea', function(event){
        Core.LoadMenu.show()
        Core.Areas.GetEdtArea( this, function( ResObjPai ){
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#RefeArea' ).focus();          
        });
    });
    /*--TENANT*/
    $(document).off( 'change', '#TenanArea' );
    $(document).on( 'change', '#TenanArea', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
           { empre_cada_stat: '%%',
             empre_cada_tenant: $( this ).val() 
           } }, '../../Areas/GetEmpreArea/', function( Resposta ){
            Core.SetSele2( $( '#EmpreArea' ), Resposta.registros, function(){
                Core.LoadMenu.hide();
            });
        });    
    });
    /*--EXCLUIR*/
    $(document).off( 'click', '#DeleBtnArea' );
    $(document).on( 'click', '#DeleBtnArea', function(event){
        var vLinha = $( this ).parent().parent();
        vFocuArea = '';
        vThisPerg = this;
        Core.SetMensMenu( 'Exclusão de Áreas', 'DESEJA REALMENTE EXCLUIR ESSE REGISTRO', 'PERGUNTA' );
        Core.MensMenu.show();
    });
    /*--BOTÃO SIM PERGUNTA*/
    $(document).off( 'click', '#SimMensMenu' );
    $(document).on( 'click', '#SimMensMenu', function(event){
        Core.MensMenu.hide();
        Core.LoadMenu.show();
        Core.Areas.SetDeleArea( vThisPerg, function( vRespAjax ){
            $( '#FiltBtnArea' ).click();
            Core.LoadMenu.hide();
        });
    });
    /*--SALVAR*/
    $(document).off( 'click', '#SalvArea' );
    $(document).on( 'click', '#SalvArea', function(event){
        var vThis = this;
        Core.LoadMenu.show()
        Core.Areas.SetSalvArea( vThis, function( Resposta ){
            if ( Resposta.vRespAjax != undefined ){
                if ( Resposta.vRespAjax.status == 'sucesso' ){
                    Core.Areas.GetCloseArea( vThis, function(){
                        vFocuArea = '';
                        $( '#TabArea' ).click();
                        $( '#FiltBtnArea' ).click();
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
    $(document).off( 'click', '#FechArea' );
    $(document).on( 'click', '#FechArea', function(event){
        Core.LoadMenu.show()
        Core.Areas.GetCloseArea( this, function(){
            $( '#TabArea' ).click();
            $( '#FiltBtnArea' ).click();
            Core.LoadMenu.hide();
        });
    });
    /*--FECHA AVISO*/
    $(document).off( 'hidden.bs.modal', '#MensMenu' );
    $(document).on( 'hidden.bs.modal', '#MensMenu', function(event){
        if ( vFocuArea != '' ){
            $( vFocuArea ).select();
            $( vFocuArea ).focus();
        };
    })
});
