/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../Core/Core.class.js';

$(document).ready(function( ) {
    var vFocuUsua = '';
    var vThisPerg = '';
    /*--FILTRAR*/
    $(document).off( 'click', '#FiltBtnUsua' );
    $(document).on( 'click', '#FiltBtnUsua', function(event){
        Core.LoadMenu.show()
        Core.Usuarios.GetTableUsua( '#UsuaTable', { 
            evento:{
                usua_cada_nome_login: '%' + $( '#FiltDadoUsua' ).val() + '%'
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
            $( '#FiltDadoUsua' ).focus();
        });
    });
    /*--INICIALIZAÇÃO*/
    $( '#FiltBtnUsua' ).click();
    /*--ENTER NO IMPUTS*/
    $(document).off( 'keypress', '#FiltDadoUsua' );
    $(document).on( 'keypress', '#FiltDadoUsua', function(event){
        if( event.keyCode == 13 ) {
            $( '#FiltBtnUsua' ).click();
        }
    });
    /*--ADICIONA*/
    $(document).off( 'click', '#AddBtnUsua' );
    $(document).on( 'click', '#AddBtnUsua', function(event){
        Core.LoadMenu.show()
        Core.Usuarios.GetAddUsua( this, function( ResObjPai ){
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#NomeUsua' ).focus();
        });
    });
    /*--EDITA*/
    $(document).off( 'click', '#EditBtnUsua' );
    $(document).on( 'click', '#EditBtnUsua', function(event){
        Core.LoadMenu.show()
        Core.Usuarios.GetEdtUsua( this, function( ResObjPai ){
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#NomeUsua' ).focus();          
        });
    });
    /*--EXCLUIR*/
    $(document).off( 'click', '#DeleBtnUsua' );
    $(document).on( 'click', '#DeleBtnUsua', function(event){
        var vLinha = $( this ).parent().parent();
        if ( Core.Usuarios.GetDataTableUsua( '#UsuaTable', vLinha, 'usua_cada_adm' ) != 0 ){
            vFocuUsua = '';
            vThisPerg = this;
            Core.SetMensMenu( 'Exclusão de Usuários', 'DESEJA REALMENTE EXCLUIR ESSE REGISTRO', 'PERGUNTA' );
            Core.MensMenu.show();
        } else {
            vFocuUsua = '';
            vThisPerg = '';
            Core.SetMensMenu( 'Exclusão de Usuários', 'USUÁRIO ROOT/ADMINISTRADOR NÃO PODE SER EXCLUIDO', 'AVISO' );
            Core.MensMenu.show();
        };
    });
    /*--RESETA SENHA*/
    $(document).off( 'click', '#ReseBtnUsua' );
    $(document).on( 'click', '#ReseBtnUsua', function(event){
        vFocuUsua = '';
        vThisPerg = this;
        Core.SetMensMenu( 'Reseta Senha de Usuários', 'DESEJA REALMENTE RESETAR SENHA DESSE REGISTRO', 'PERGUNTA' );
        Core.MensMenu.show();
    });
    /*--BOTÃO SIM PERGUNTA*/
    $(document).off( 'click', '#SimMensMenu' );
    $(document).on( 'click', '#SimMensMenu', function(event){
        Core.MensMenu.hide();
        if ( $(vThisPerg).attr( 'id' ) == 'DeleBtnUsua' ){
            Core.LoadMenu.show();
            Core.Usuarios.SetDeleUsua( vThisPerg, function( vRespAjax ){
                $( '#FiltBtnUsua' ).click();
                Core.LoadMenu.hide();
            });
        } else if ( $(vThisPerg).attr( 'id' ) == 'ReseBtnUsua' ){
            Core.LoadMenu.show();
            Core.Usuarios.SetReseSenhUsua( vThisPerg, function( vRespAjax ){
                $( '#FiltBtnUsua' ).click();
                Core.LoadMenu.hide();
            });
        };
    });
    /*--SALVAR*/
    $(document).off( 'click', '#SalvUsua' );
    $(document).on( 'click', '#SalvUsua', function(event){
        var vThis = this;
        Core.LoadMenu.show()
        Core.Usuarios.SetSalvUsua( vThis, function( Resposta ){
            if ( Resposta.vRespAjax != undefined ){
                if ( Resposta.vRespAjax.status == 'sucesso' ){
                    Core.Usuarios.GetCloseUsua( vThis, function(){
                        vFocuUsua = '';
                        $( '#TabUsua' ).click();
                        $( '#FiltBtnUsua' ).click();
                        Core.LoadMenu.hide();
                    });
                } else {
                    $( Resposta.vResObjPai ).find( '#LogiUsua' ).parent().addClass( 'has-validated' );
                    $( Resposta.vResObjPai ).find( '#LogiUsuaDupli' ).html( 'E-mail ja está sendo usado' );
                    $( Resposta.vResObjPai ).find( '#LogiUsua' ).addClass( 'is-invalid' );
                    vFocuUsua = $( Resposta.vResObjPai ).find( '#LogiUsua' );
                    Core.LoadMenu.hide();
                }
            } else {
                if (  $( Resposta.vResObjPai ).find( '#LogiUsua' ).val() == '' ){
                    $( Resposta.vResObjPai ).find( '#LogiUsuaDupli' ).html( 'E-mail não pode ficar em branco' );
                };
                Core.LoadMenu.hide();
                $( Resposta.vResObjPai ).find( Resposta.vResObjVali ).focus();

            };
        });
    });
    /*--FECHA*/
    $(document).off( 'click', '#FechUsua' );
    $(document).on( 'click', '#FechUsua', function(event){
        Core.LoadMenu.show()
        Core.Usuarios.GetCloseUsua( this, function(){
            $( '#TabUsua' ).click();
            $( '#FiltBtnUsua' ).click();
            Core.LoadMenu.hide();
        });
    });
    /*--FECHA AVISO*/
    $(document).off( 'hidden.bs.modal', '#MensMenu' );
    $(document).on( 'hidden.bs.modal', '#MensMenu', function(event){
        if ( vFocuUsua != '' ){
            $( vFocuUsua ).select();
            $( vFocuUsua ).focus();
        };
    })
});
