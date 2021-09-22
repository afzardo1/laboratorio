/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../Core/Core.class.js';

$(document).ready(function() {
    Core.FinalSess();
    /*--ENTER NO IMPUTS*/
    $(document).on( 'keypress', 'input', function(event){
        if( event.keyCode == 13 ) {
            $( '#EntraBtn' ).click();
        }
    });
    /*--BOTÃO ENTRAR*/
    $(document).on( 'click', '#EntraBtn', function(){
        Core.GetObjtPai( this, [ 'LogiForm' ], function( ResObjPai ){
            $( ResObjPai ).addClass( 'was-validated' );
            Core.GetCampObri( ResObjPai, [ '' ], '[data-obriga="S"]', function( ResObjVali ){
                if ( ResObjVali != 'validado' ){
                    $( ResObjVali ).focus();
                } else {
                    var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
                    if ( regex.test( $( ResObjPai ).find( '#EmailIpt' ).val() ) ){
                        Core.Login.GetValiUsua(
                            $( ResObjPai ).find( '#EmailIpt' ).val(),
                            $( ResObjPai ).find( '#SenhaIpt' ).val(), function( vRespLogi ) {
                            if ( vRespLogi.status != 'sucesso' ){
                                var Delay = 5000;
                                $( '#AletLogi' ).removeClass('bg-danger bg-warning');
                                $( '#AletLogi' ).find('div:eq(1)').removeClass('text-white');
                                if ( vRespLogi.status == 'invalido'){
                                    $( '#AletLogi' ).addClass('bg-warning');
                                } else if ( vRespLogi.status == 'erro'){
                                    $( '#AletLogi' ).addClass('bg-danger');
                                    $( '#AletLogi' ).find('div:eq(1)').addClass('text-white');
                                    Delay = 100000000000;
                                };
                                $( '#AletLogi' ).find('div:eq(1)').html( vRespLogi.detalhes );
                                new bootstrap.Toast( '#AletLogi', { animation: true, delay: Delay } ).show();
                                $( ResObjPai ).find( '#EmailIpt' ).focus();
                            } else {
                                location.href = 'Front/Menu/menu.html';
                            }
                        });
                    } else {
                        var Delay = 5000;
                        $( '#AletLogi' ).removeClass('bg-danger bg-warning');
                        $( '#AletLogi' ).find('div:eq(1)').removeClass('text-white');
                        $( '#AletLogi' ).addClass('bg-warning');
                        $( '#AletLogi' ).find('div:eq(1)').html( 'E-mail Inválido' );
                        new bootstrap.Toast( '#AletLogi', { animation: true, delay: Delay } ).show();
                        $( ResObjPai ).find( '#EmailIpt' ).focus();
                    };
                };
            });
        });
    });
});