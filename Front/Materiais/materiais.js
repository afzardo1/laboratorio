/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../Core/Core.class.js';

$(document).ready(function( ) {
    var vFocuMate = '';
    var vThisPerg = '';
    /*--FILTRAR*/
    $(document).off( 'click', '#FiltBtnMate' );
    $(document).on( 'click', '#FiltBtnMate', function(event){
        Core.LoadMenu.show()
        Core.Materiais.GetTableMate( '#TableMate', {
            evento:{
                mate_cada_tenant_iden: $( '#FiltTenanMate' ).val(),
                mate_cada_empre_iden: $( '#FiltEmpreMate' ).val(),
                mate_cada_descr_forne: '%' + $( '#FiltDadoMate' ).val() + '%',
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
            $( '#FiltDadoMate' ).focus();
        });
    });
    /*--INICIALIZAÇÃO*/
    Core.LoadMenu.show();
    Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Materiais/GetTenanMate/', function( Resposta ){
        Core.SetSele2( $( '#FiltTenanMate' ), Resposta.registros, function(){
            $( '#FiltTenanMate' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
            if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
                $( '#FiltTenanMate' ).prop( 'disabled', true );
            };
            Core.SetAjax( { evento: 
              { empre_cada_stat: '%%',
                empre_cada_tenant: $( '#FiltTenanMate' ).val() 
              } }, '../../Materiais/GetEmpreMate/', function( Resposta ){
                Core.SetSele2( $( '#FiltEmpreMate' ), Resposta.registros, function(){
                    $( '#FiltEmpreMate' ).val( Core.Login.GetUsuaSess( 'usua_cada_empre' ) ).trigger( 'change' );
                    if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
                        $( '#FiltEmpreMate' ).prop( 'disabled', true );
                    };
                    $( '#FiltBtnMate' ).click();
                });
            });
        });
    });
    /*--FILTRO TENANT*/
    $(document).off( 'change', '#FiltTenanMate' );
    $(document).on( 'change', '#FiltTenanMate', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
           { empre_cada_stat: '%%',
             empre_cada_tenant: $( this ).val() 
           } }, '../../Materiais/GetEmpreMate/', function( Resposta ){
            Core.SetSele2( $( '#FiltEmpreMate' ), Resposta.registros, function(){
                Core.LoadMenu.hide();
            });
        });    
    });
    /*--ENTER NO IMPUTS*/
    $(document).off( 'keypress', '#FiltDadoMate' );
    $(document).on( 'keypress', '#FiltDadoMate', function(event){
        if( event.keyCode == 13 ) {
            $( '#FiltBtnMate' ).click();
        }
    });
    /*--ADICIONA*/
    $(document).off( 'click', '#AddBtnMate' );
    $(document).on( 'click', '#AddBtnMate', function(event){
        Core.LoadMenu.show()
        Core.Materiais.GetAddMate( this, function( ResObjPai ){
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#DescrMate' ).focus();
        });
    });
    /*--EDITA*/
    $(document).off( 'click', '#EditBtnMate' );
    $(document).on( 'click', '#EditBtnMate', function(event){
        Core.LoadMenu.show()
        Core.Materiais.GetEdtMate( this, function( ResObjPai ){
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#DescrMate' ).focus();          
        });
    });
    /*--TENANT*/
    $(document).off( 'change', '#TenanMate' );
    $(document).on( 'change', '#TenanMate', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
           { empre_cada_stat: '%%',
             empre_cada_tenant: $( this ).val() 
           } }, '../../Materiais/GetEmpreMate/', function( Resposta ){
            Core.SetSele2( $( '#EmpreMate' ), Resposta.registros, function(){
                Core.LoadMenu.hide();
            });
        });    
    });
    /*--EXCLUIR*/
    $(document).off( 'click', '#DeleBtnMate' );
    $(document).on( 'click', '#DeleBtnMate', function(event){
        var vLinha = $( this ).parent().parent();
        vFocuMate = '';
        vThisPerg = this;
        Core.SetMensMenu( 'Exclusão de Materiais', 'DESEJA REALMENTE EXCLUIR ESSE REGISTRO', 'PERGUNTA' );
        Core.MensMenu.show();
    });
    /*--BOTÃO SIM PERGUNTA*/
    $(document).off( 'click', '#SimMensMenu' );
    $(document).on( 'click', '#SimMensMenu', function(event){
        Core.MensMenu.hide();
        Core.LoadMenu.show();
        Core.Materiais.SetDeleMate( vThisPerg, function( vRespAjax ){
            $( '#FiltBtnMate' ).click();
            Core.LoadMenu.hide();
        });
    });
    /*--SALVAR*/
    $(document).off( 'click', '#SalvMate' );
    $(document).on( 'click', '#SalvMate', function(event){
        var vThis = this;
        Core.LoadMenu.show()
        Core.Materiais.SetSalvMate( vThis, function( Resposta ){
            if ( Resposta.vRespAjax != undefined ){
                if ( Resposta.vRespAjax.status == 'sucesso' ){
                    Core.Materiais.GetCloseMate( vThis, function(){
                        vFocuMate = '';
                        $( '#TabMate' ).click();
                        $( '#FiltBtnMate' ).click();
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
    $(document).off( 'click', '#FechMate' );
    $(document).on( 'click', '#FechMate', function(event){
        Core.LoadMenu.show()
        Core.Materiais.GetCloseMate( this, function(){
            $( '#TabMate' ).click();
            $( '#FiltBtnMate' ).click();
            Core.LoadMenu.hide();
        });
    });
    /*--FECHA AVISO*/
    $(document).off( 'hidden.bs.modal', '#MensMenu' );
    $(document).on( 'hidden.bs.modal', '#MensMenu', function(event){
        if ( vFocuMate != '' ){
            $( vFocuMate ).select();
            $( vFocuMate ).focus();
        };
    })
});
