/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../../Core/Core.class.js';

$(document).ready(function( ) {
    var vFocuTenan = '';
    var vThisPerg = '';
    /*--FILTRAR*/
    $(document).off( 'click', '#FiltBtnTenan' );
    $(document).on( 'click', '#FiltBtnTenan', function(event){
        Core.LoadMenu.show()
        Core.Tenant.GetTableTenan( '#TableTenan', { 
            evento:{
                tenant_cada_nome_docu: '%' + $( '#FiltDadoTenan' ).val() + '%',
                tenant_cada_stat: '%%',
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
            $( '#FiltDadoTenan' ).focus();
        });
    });
    /*--INICIALIZAÇÃO*/
    $( '#FiltBtnTenan' ).click();
    /*--ENTER NO IMPUTS*/
    $(document).off( 'keypress', '#FiltDadoTenan' );
    $(document).on( 'keypress', '#FiltDadoTenan', function(event){
        if( event.keyCode == 13 ) {
            $( '#FiltBtnTenan' ).click();
        }
    });
    /*--ADICIONA*/
    $(document).off( 'click', '#AddBtnTenan' );
    $(document).on( 'click', '#AddBtnTenan', function(event){
        Core.LoadMenu.show()
        Core.Tenant.GetAddTenan( this, function( ResObjPai ){
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#DocTenan' ).focus();
        });
    });
    /*--EDITA*/
    $(document).off( 'click', '#EditBtnTenan' );
    $(document).on( 'click', '#EditBtnTenan', function(event){
        Core.LoadMenu.show()
        Core.Tenant.GetEdtTenan( this, function( ResObjPai ){
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#DocTenan' ).focus();          
        });
    });
    /*--EXCLUIR*/
    $(document).off( 'click', '#DeleBtnTenan' );
    $(document).on( 'click', '#DeleBtnTenan', function(event){
        var vLinha = $( this ).parent().parent();
        vFocuTenan = '';
        vThisPerg = this;
        Core.SetMensMenu( 'Exclusão de Tenant', 'DESEJA REALMENTE EXCLUIR ESSE REGISTRO', 'PERGUNTA' );
        Core.MensMenu.show();
    });
    /*--CONSULTA CNPJ*/
    $(document).off( 'click', '#ConsuCnpjBntTenan' );
    $(document).on( 'click', '#ConsuCnpjBntTenan', function(event){    
        Core.LoadMenu.show()
        Core.Tenant.GetCnpjTenan( this, function( vRespLogi ){
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
    $(document).off( 'click', '#ConsuCepBntTenan' );
    $(document).on( 'click', '#ConsuCepBntTenan', function(event){    
        Core.LoadMenu.show()
        Core.Tenant.GetCepTenan( this, function( vRespLogi ){
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
        if ( $(vThisPerg).attr( 'id' ) == 'DeleBtnTenan' ){
            Core.LoadMenu.show();
            Core.Tenant.SetDeleTenan( vThisPerg, function( vRespAjax ){
                $( '#FiltBtnTenan' ).click();
                Core.LoadMenu.hide();
            });
        };
    });
    /*--SALVAR*/
    $(document).off( 'click', '#SalvTenan' );
    $(document).on( 'click', '#SalvTenan', function(event){
        var vThis = this;
        Core.LoadMenu.show()
        Core.Tenant.SetSalvTenan( vThis, function( Resposta ){
            if ( Resposta.vRespAjax != undefined ){
                if ( Resposta.vRespAjax.status == 'sucesso' ){
                    Core.Tenant.GetCloseTenan( vThis, function(){
                        vFocuTenan = '';
                        $( '#TabTenan' ).click();
                        $( '#FiltBtnTenan' ).click();
                        Core.LoadMenu.hide();
                    });
                } else {
                    $( Resposta.vResObjPai ).find( '#DocTenan' ).parent().addClass( 'has-validated' );
                    $( Resposta.vResObjPai ).find( '#AlerDocTenan' ).html( 'CNPJ ou CPF ja está sendo usado' );
                    $( Resposta.vResObjPai ).find( '#DocTenan' ).addClass( 'is-invalid' );
                    vFocuTenan = $( Resposta.vResObjPai ).find( '#DocTenan' );
                    Core.LoadMenu.hide();
                }
            } else {
                if (  $( Resposta.vResObjPai ).find( '#DocTenan' ).val() == '' ){
                    $( Resposta.vResObjPai ).find( '#AlerDocTenan' ).html( 'CNPJ ou CPF não pode ficar em branco' );
                    $( Resposta.vResObjPai ).find( '#AlerDocTenan' ).show()
                };
                Core.LoadMenu.hide();
                $( Resposta.vResObjPai ).find( Resposta.vResObjVali ).focus();
            };
        });
    });
    /*--FECHA*/
    $(document).off( 'click', '#FechTenan' );
    $(document).on( 'click', '#FechTenan', function(event){
        Core.LoadMenu.show()
        Core.Tenant.GetCloseTenan( this, function(){
            $( '#TabTenan' ).click();
            $( '#FiltBtnTenan' ).click();
            Core.LoadMenu.hide();
        });
    });
    /*--FECHA AVISO*/
    $(document).off( 'hidden.bs.modal', '#MensMenu' );
    $(document).on( 'hidden.bs.modal', '#MensMenu', function(event){
        if ( vFocuTenan != '' ){
            $( vFocuTenan ).select();
            $( vFocuTenan ).focus();
        };
    })
});
