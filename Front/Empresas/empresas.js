/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../Core/Core.class.js';

$(document).ready(function( ) {
    var vFocuEmpre = '';
    var vThisPerg = '';
    /*--FILTRAR*/
    $(document).off( 'click', '#FiltBtnEmpre' );
    $(document).on( 'click', '#FiltBtnEmpre', function(event){
        Core.LoadMenu.show()
        Core.Empresas.GetTableEmpre( '#TableEmpre', { 
            evento:{
                empre_cada_nome_docu: '%' + $( '#FiltDadoEmpre' ).val() + '%',
                empre_cada_tenant: $( '#FiltTenanEmpre' ).val()
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
            $( '#FiltDadoEmpre' ).focus();
        });
    });
    /*--INICIALIZAÇÃO*/
    Core.LoadMenu.show();
    Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Empresas/GetTenanEmpre/', function( Resposta ){
        Core.SetSele2( $( '#FiltTenanEmpre' ), Resposta.registros, function(){
            $( '#FiltTenanEmpre' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
            if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
                $( '#FiltTenanEmpre' ).prop( 'disabled', true );
            };
            $( '#FiltBtnEmpre' ).click();
        });
    });
    /*--ENTER NO IMPUTS*/
    $(document).off( 'keypress', '#FiltDadoEmpre' );
    $(document).on( 'keypress', '#FiltDadoEmpre', function(event){
        if( event.keyCode == 13 ) {
            $( '#FiltBtnEmpre' ).click();
        }
    });
    /*--ADICIONA*/
    $(document).off( 'click', '#AddBtnEmpre' );
    $(document).on( 'click', '#AddBtnEmpre', function(event){
        Core.LoadMenu.show()
        Core.Empresas.GetAddEmpre( this, function( ResObjPai ){
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#DocEmpre' ).focus();
        });
    });
    /*--EDITA*/
    $(document).off( 'click', '#EditBtnEmpre' );
    $(document).on( 'click', '#EditBtnEmpre', function(event){
        Core.LoadMenu.show()
        Core.Empresas.GetEdtEmpre( this, function( ResObjPai ){
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#DocEmpre' ).focus();          
        });
    });
    /*--EXCLUIR*/
    $(document).off( 'click', '#DeleBtnEmpre' );
    $(document).on( 'click', '#DeleBtnEmpre', function(event){
        var vLinha = $( this ).parent().parent();
        vFocuEmpre = '';
        vThisPerg = this;
        Core.SetMensMenu( 'Exclusão de Empresas', 'DESEJA REALMENTE EXCLUIR ESSE REGISTRO', 'PERGUNTA' );
        Core.MensMenu.show();
    });
    /*--CONSULTA CNPJ*/
    $(document).off( 'click', '#ConsuCnpjBntEmpre' );
    $(document).on( 'click', '#ConsuCnpjBntEmpre', function(event){    
        Core.LoadMenu.show()
        Core.Empresas.GetCnpjEmpre( this, function( vRespLogi ){
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
        });
    });
    /*--CONSULTA CEP*/
    $(document).off( 'click', '#ConsuCepBntEmpre' );
    $(document).on( 'click', '#ConsuCepBntEmpre', function(event){    
        Core.LoadMenu.show()
        Core.Empresas.GetCepEmpre( this, function( vRespLogi ){
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
        });
    });
    /*--BOTÃO SIM PERGUNTA*/
    $(document).off( 'click', '#SimMensMenu' );
    $(document).on( 'click', '#SimMensMenu', function(event){
        Core.MensMenu.hide();
        if ( $(vThisPerg).attr( 'id' ) == 'DeleBtnEmpre' ){
            Core.LoadMenu.show();
            Core.Empresas.SetDeleEmpre( vThisPerg, function( vRespAjax ){
                $( '#FiltBtnEmpre' ).click();
                Core.LoadMenu.hide();
            });
        };
    });
    /*--SALVAR*/
    $(document).off( 'click', '#SalvEmpre' );
    $(document).on( 'click', '#SalvEmpre', function(event){
        var vThis = this;
        Core.LoadMenu.show()
        Core.Empresas.SetSalvEmpre( vThis, function( Resposta ){
            if ( Resposta.vRespAjax != undefined ){
                if ( Resposta.vRespAjax.status == 'sucesso' ){
                    Core.Empresas.GetCloseEmpre( vThis, function(){
                        vFocuEmpre = '';
                        $( '#TabEmpre' ).click();
                        $( '#FiltBtnEmpre' ).click();
                        Core.LoadMenu.hide();
                    });
                } else {
                    $( Resposta.vResObjPai ).find( '#DocEmpre' ).parent().addClass( 'has-validated' );
                    $( Resposta.vResObjPai ).find( '#AlerDocEmpre' ).html( 'CNPJ ou CPF ja está sendo usado' );
                    $( Resposta.vResObjPai ).find( '#DocEmpre' ).addClass( 'is-invalid' );
                    vFocuEmpre = $( Resposta.vResObjPai ).find( '#DocEmpre' );
                    Core.LoadMenu.hide();
                }
            } else {
                if (  $( Resposta.vResObjPai ).find( '#DocEmpre' ).val() == '' ){
                    $( Resposta.vResObjPai ).find( '#AlerDocEmpre' ).html( 'CNPJ ou CPF não pode ficar em branco' );
                    $( Resposta.vResObjPai ).find( '#AlerDocEmpre' ).show()
                };
                Core.LoadMenu.hide();
                $( Resposta.vResObjPai ).find( Resposta.vResObjVali ).focus();
            };
        });
    });
    /*--FECHA*/
    $(document).off( 'click', '#FechEmpre' );
    $(document).on( 'click', '#FechEmpre', function(event){
        Core.LoadMenu.show();
        Core.Empresas.GetCloseEmpre( this, function(){
            $( '#TabEmpre' ).click();
            $( '#FiltBtnEmpre' ).click();
            Core.LoadMenu.hide();
        });
    });
    /*--FECHA AVISO*/
    $(document).off( 'hidden.bs.modal', '#MensMenu' );
    $(document).on( 'hidden.bs.modal', '#MensMenu', function(event){
        if ( vFocuEmpre != '' ){
            $( vFocuEmpre ).select();
            $( vFocuEmpre ).focus();
        };
    })
});
