/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../Core/Core.class.js';

$(document).ready(function( ) {
    var vFocuClie = '';
    var vThisPerg = '';
    /*--FILTRAR*/
    $(document).off( 'click', '#FiltBtnClie' );
    $(document).on( 'click', '#FiltBtnClie', function(event){
        Core.LoadMenu.show()
        Core.Clientes.GetTableClie( '#TableClie', { 
            evento:{
                clie_cada_tenan: $( '#FiltTenanClie' ).val(),
                clie_cada_empre: $( '#FiltEmpreClie' ).val(),
                clie_cada_nome_docu_refe: '%' + $( '#FiltDadoClie' ).val() + '%',
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
    Core.LoadMenu.show();
    Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Laboratorio/Clientes/GetTenanClie/', function( Resposta ){
        Core.SetSele2( $( '#FiltTenanClie' ), Resposta.registros, function(){
            $( '#FiltTenanClie' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
            if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
                $( '#FiltTenanClie' ).prop( 'disabled', true );
            };
            Core.SetAjax( { evento: 
              { empre_cada_stat: '%%',
                empre_cada_tenant: $( '#FiltTenanClie' ).val() 
              } }, '../../Laboratorio/Clientes/GetEmpreClie/', function( Resposta ){
                Core.SetSele2( $( '#FiltEmpreClie' ), Resposta.registros, function(){
                    $( '#FiltEmpreClie' ).val( Core.Login.GetUsuaSess( 'usua_cada_empre' ) ).trigger( 'change' );
                    if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
                        $( '#FiltEmpreClie' ).prop( 'disabled', true );
                    };
                    $( '#FiltBtnClie' ).click();
                });
            });
        });
    });
    /*--FILTRO TENANT*/
    $(document).off( 'change', '#FiltTenanClie' );
    $(document).on( 'change', '#FiltTenanClie', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
           { empre_cada_stat: '%%',
             empre_cada_tenant: $( this ).val() 
           } }, '../../Laboratorio/Clientes/GetEmpreClie/', function( Resposta ){
            Core.SetSele2( $( '#FiltEmpreClie' ), Resposta.registros, function(){
                Core.LoadMenu.hide();
            });
        });    
    });
    /*--ENTER NO IMPUTS*/
    $(document).off( 'keypress', '#FiltDadoClie' );
    $(document).on( 'keypress', '#FiltDadoClie', function(event){
        if( event.keyCode == 13 ) {
            $( '#FiltBtnClie' ).click();
        }
    });
    /*--ADICIONA*/
    $(document).off( 'click', '#AddBtnClie' );
    $(document).on( 'click', '#AddBtnClie', function(event){
        Core.LoadMenu.show()
        Core.Clientes.GetAddClie( this, function( ResObjPai ){
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#RefeClie' ).focus();
        });
    });
    /*--EDITA*/
    $(document).off( 'click', '#EditBtnClie' );
    $(document).on( 'click', '#EditBtnClie', function(event){
        Core.LoadMenu.show()
        Core.Clientes.GetEdtClie( this, function( ResObjPai ){
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#RefeClie' ).focus();          
        });
    });
    /*--TENANT*/
    $(document).off( 'change', '#TenanClie' );
    $(document).on( 'change', '#TenanClie', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
           { empre_cada_stat: '%%',
             empre_cada_tenant: $( this ).val() 
           } }, '../../Laboratorio/Clientes/GetEmpreClie/', function( Resposta ){
            Core.SetSele2( $( '#EmpreClie' ), Resposta.registros, function(){
                Core.LoadMenu.hide();
            });
        });    
    });
    /*--EXCLUIR*/
    $(document).off( 'click', '#DeleBtnClie' );
    $(document).on( 'click', '#DeleBtnClie', function(event){
        var vLinha = $( this ).parent().parent();
        if ( Core.Clientes.GetDataTableClie( '#TableClie', vLinha, 'IdenClie' ) != 0 ){
            vFocuClie = '';
            vThisPerg = this;
            Core.SetMensMenu( 'Exclusão de Clientes', 'DESEJA REALMENTE EXCLUIR ESSE REGISTRO', 'PERGUNTA' );
            Core.MensMenu.show();
        } else {
            vFocuClie = '';
            vThisPerg = '';
            Core.SetMensMenu( 'Exclusão de Clientes', 'USUÁRIO ROOT/ADMINISTRADOR NÃO PODE SER EXCLUIDO', 'AVISO' );
            Core.MensMenu.show();
        };
    });
    /*--BOTÃO SIM PERGUNTA*/
    $(document).off( 'click', '#SimMensMenu' );
    $(document).on( 'click', '#SimMensMenu', function(event){
        Core.MensMenu.hide();
        Core.LoadMenu.show();
        Core.Clientes.SetDeleClie( vThisPerg, function( vRespAjax ){
            $( '#FiltBtnClie' ).click();
            Core.LoadMenu.hide();
        });
    });
    /*--SALVAR*/
    $(document).off( 'click', '#SalvClie' );
    $(document).on( 'click', '#SalvClie', function(event){
        var vThis = this;
        Core.LoadMenu.show()
        Core.Clientes.SetSalvClie( vThis, function( Resposta ){
            if ( Resposta.vRespAjax != undefined ){
                if ( Resposta.vRespAjax.status == 'sucesso' ){
                    Core.Clientes.GetCloseClie( vThis, function(){
                        vFocuClie = '';
                        $( '#TabClie' ).click();
                        $( '#FiltBtnClie' ).click();
                        Core.LoadMenu.hide();
                    });
                } else {
                    $( Resposta.vResObjPai ).find( '#DocClie' ).parent().addClass( 'has-validated' );
                    $( Resposta.vResObjPai ).find( '#AlerDocClie' ).html( 'CNPJ ou CPF ja está sendo usado' );
                    $( Resposta.vResObjPai ).find( '#DocClie' ).addClass( 'is-invalid' );
                    vFocuClie = $( Resposta.vResObjPai ).find( '#DocClie' );
                    Core.LoadMenu.hide();
                }
            } else {
                if (  $( Resposta.vResObjPai ).find( '#DocClie' ).val() == '' ){
                    $( Resposta.vResObjPai ).find( '#AlerDocClie' ).html( 'CNPJ ou CPF não pode ficar em branco' );
                };
                Core.LoadMenu.hide();
                $( Resposta.vResObjPai ).find( Resposta.vResObjVali ).focus();

            };
        });
    });
    /*--FECHA*/
    $(document).off( 'click', '#FechClie' );
    $(document).on( 'click', '#FechClie', function(event){
        Core.LoadMenu.show()
        Core.Clientes.GetCloseClie( this, function(){
            $( '#TabClie' ).click();
            $( '#FiltBtnClie' ).click();
            Core.LoadMenu.hide();
        });
    });
    /*--FECHA AVISO*/
    $(document).off( 'hidden.bs.modal', '#MensMenu' );
    $(document).on( 'hidden.bs.modal', '#MensMenu', function(event){
        if ( vFocuClie != '' ){
            $( vFocuClie ).select();
            $( vFocuClie ).focus();
        };
    })
});
