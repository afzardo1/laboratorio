/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../Core/Core.class.js';

$(document).ready(function() {
    $( '#UsuaNSenha' ).html( 'Olá ' + Core.Login.GetUsuaSess( 'usua_cada_nome' ) );
    /*--ENTER NO IMPUTS*/
    $(document).on( 'keypress', 'input', function(event){
        if( event.keyCode == 13 ) {
            $( '#SalvEntraBtn' ).click();
        }
    });
    /*--BOTÃO SALVAR ENTRAR*/
    $(document).on( 'click', '#SalvEntraBtn', function(){
        Core.GetObjtPai( this, [ 'NSenhaForm' ], function( ResObjPai ){
            $( ResObjPai ).addClass( 'was-validated' );
            Core.GetCampObri( ResObjPai, [ '' ], '[data-obriga="S"]', function( ResObjVali ){
                if ( ResObjVali != 'validado' ){
                    $( ResObjVali ).focus();
                } else {
                    if ( $( ResObjPai ).find( '#SenhaNovaIpt' ).val() == $( ResObjPai ).find( '#SenhaRptIpt' ).val() ){
                        LoadNSenha = new bootstrap.Modal( '#LoadNSenha', { keyboard: false, backdrop: 'static' } )
                        LoadNSenha.show();
                        Core.Login.GetAlteSenhaLogi(
                            Core.Login.GetUsuaSess( 'usua_cada_iden' ),
                            $( ResObjPai ).find( '#SenhaNovaIpt' ).val(), function( vRespLogi ) {
                            if ( vRespLogi.status != 'sucesso' ){
                                LoadNSenha.hide();
                                var Delay = 5000;
                                $( '#AletNSenha' ).removeClass('bg-danger bg-warning');
                                $( '#AletNSenha' ).find('div:eq(1)').removeClass('text-white');
                                if ( vRespLogi.status == 'invalido'){
                                    $( '#AletNSenha' ).addClass('bg-warning');
                                } else if ( vRespLogi.status == 'erro'){
                                    $( '#AletNSenha' ).addClass('bg-danger');
                                    $( '#AletNSenha' ).find('div:eq(1)').addClass('text-white');
                                    Delay = 100000000000;
                                };
                                $( '#AletNSenha' ).find('div:eq(1)').html( vRespLogi.detalhes );
                                new bootstrap.Toast( '#AletNSenha', { animation: true, delay: Delay } ).show();
                                $( ResObjPai ).find( '#SenhaNovaIpt' ).focus();
                            } else {
                                location.href = '../../Front/Menu/menu.html';
                            };
                        });
                    } else {
                        $( '#AletNSenha' ).addClass('bg-danger');
                        $( '#AletNSenha' ).find('div:eq(1)').addClass('text-white');
                        $( '#AletNSenha' ).find('div:eq(1)').html( 'Senha não Confere' );
                        new bootstrap.Toast( '#AletNSenha', { animation: true, delay: 100000000000 } ).show();
                        $( ResObjPai ).find( '#SenhaNovaIpt' ).focus();
                    };
                };
            });
        });
    });
});