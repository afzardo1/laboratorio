/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../Core/Core.class.js';

$(document).ready(function( ) {
    var vFocuFabr = '';
    var vThisPerg = '';
    /*--FILTRAR*/
    $(document).off( 'click', '#FiltBtnFabr' );
    $(document).on( 'click', '#FiltBtnFabr', function(event){
        Core.LoadMenu.show()
        Core.Fabricantes.GetTableFabr( '#TableFabr', { 
            evento:{
                fabr_cada_tenan: $( '#FiltTenanFabr' ).val(),
                fabr_cada_empre: $( '#FiltEmpreFabr' ).val(),
                fabr_cada_nome_docu_refe: '%' + $( '#FiltDadoFabr' ).val() + '%',
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
    Core.SetAjax( { evento: { tenant_cada_stat: '%%' } }, '../../Laboratorio/Fabricantes/GetTenanFabr/', function( Resposta ){
        Core.SetSele2( $( '#FiltTenanFabr' ), Resposta.registros, function(){
            $( '#FiltTenanFabr' ).val( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
            if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
                $( '#FiltTenanFabr' ).prop( 'disabled', true );
            };
            Core.SetAjax( { evento: 
              { empre_cada_stat: '%%',
                empre_cada_tenant: $( '#FiltTenanFabr' ).val() 
              } }, '../../Laboratorio/Fabricantes/GetEmpreFabr/', function( Resposta ){
                Core.SetSele2( $( '#FiltEmpreFabr' ), Resposta.registros, function(){
                    $( '#FiltEmpreFabr' ).val( Core.Login.GetUsuaSess( 'usua_cada_empre' ) ).trigger( 'change' );
                    if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
                        $( '#FiltEmpreFabr' ).prop( 'disabled', true );
                    };
                    $( '#FiltBtnFabr' ).click();
                });
            });
        });
    });
    /*--FILTRO TENANT*/
    $(document).off( 'change', '#FiltTenanFabr' );
    $(document).on( 'change', '#FiltTenanFabr', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
           { empre_cada_stat: '%%',
             empre_cada_tenant: $( this ).val() 
           } }, '../../Laboratorio/Fabricantes/GetEmprefabr/', function( Resposta ){
            Core.SetSele2( $( '#FiltEmpreFabr' ), Resposta.registros, function(){
                Core.LoadMenu.hide();
            });
        });    
    });
    /*--ENTER NO IMPUTS*/
    $(document).off( 'keypress', '#FiltDadoFabr' );
    $(document).on( 'keypress', '#FiltDadoFabr', function(event){
        if( event.keyCode == 13 ) {
            $( '#FiltBtnFabr' ).click();
        }
    });
    /*--ADICIONA*/
    $(document).off( 'click', '#AddBtnFabr' );
    $(document).on( 'click', '#AddBtnFabr', function(event){
        Core.LoadMenu.show()
        Core.Fabricantes.GetAddFabr( this, function( ResObjPai ){
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#RefeFabr' ).focus();
        });
    });
    /*--EDITA*/
    $(document).off( 'click', '#EditBtnFabr' );
    $(document).on( 'click', '#EditBtnFabr', function(event){
        Core.LoadMenu.show()
        Core.Fabricantes.GetEdtFabr( this, function( ResObjPai ){
            Core.LoadMenu.hide();
            $( ResObjPai ).find( '#RefeFabr' ).focus();          
        });
    });
    /*--TENANT*/
    $(document).off( 'change', '#TenanFabr' );
    $(document).on( 'change', '#TenanFabr', function(event){
        Core.LoadMenu.show();
        Core.SetAjax( { evento: 
           { empre_cada_stat: '%%',
             empre_cada_tenant: $( this ).val() 
           } }, '../../Laboratorio/Fabricantes/GetEmpreFabr/', function( Resposta ){
            Core.SetSele2( $( '#EmpreFabr' ), Resposta.registros, function(){
                Core.LoadMenu.hide();
            });
        });    
    });
    /*--EXCLUIR*/
    $(document).off( 'click', '#DeleBtnFabr' );
    $(document).on( 'click', '#DeleBtnFabr', function(event){
        var vLinha = $( this ).parent().parent();
        vFocuFabr = '';
        vThisPerg = this;
        Core.SetMensMenu( 'Exclusão de Fabricantes', 'DESEJA REALMENTE EXCLUIR ESSE REGISTRO', 'PERGUNTA' );
        Core.MensMenu.show();
    });
    /*--BOTÃO SIM PERGUNTA*/
    $(document).off( 'click', '#SimMensMenu' );
    $(document).on( 'click', '#SimMensMenu', function(event){
        Core.MensMenu.hide();
        Core.LoadMenu.show();
        Core.Fabricantes.SetDeleFabr( vThisPerg, function( vRespAjax ){
            $( '#FiltBtnFabr' ).click();
            Core.LoadMenu.hide();
        });
    });
    /*--SALVAR*/
    $(document).off( 'click', '#SalvFabr' );
    $(document).on( 'click', '#SalvFabr', function(event){
        var vThis = this;
        Core.LoadMenu.show()
        Core.Fabricantes.SetSalvFabr( vThis, function( Resposta ){
            if ( Resposta.vRespAjax != undefined ){
                if ( Resposta.vRespAjax.status == 'sucesso' ){
                    Core.Fabricantes.GetCloseFabr( vThis, function(){
                        vFocuFabr = '';
                        $( '#TabFabr' ).click();
                        $( '#FiltBtnFabr' ).click();
                        Core.LoadMenu.hide();
                    });
                } else {
                    $( Resposta.vResObjPai ).find( '#DocFabr' ).parent().addClass( 'has-validated' );
                    $( Resposta.vResObjPai ).find( '#AlerDocFabr' ).html( 'CNPJ ou CPF ja está sendo usado' );
                    $( Resposta.vResObjPai ).find( '#DocFabr' ).addClass( 'is-invalid' );
                    vFocuFabr = $( Resposta.vResObjPai ).find( '#DocFabr' );
                    Core.LoadMenu.hide();
                }
            } else {
                if (  $( Resposta.vResObjPai ).find( '#DocFabr' ).val() == '' ){
                    $( Resposta.vResObjPai ).find( '#AlerDocFabr' ).html( 'CNPJ ou CPF não pode ficar em branco' );
                };
                Core.LoadMenu.hide();
                $( Resposta.vResObjPai ).find( Resposta.vResObjVali ).focus();

            };
        });
    });
    /*--FECHA*/
    $(document).off( 'click', '#FechFabr' );
    $(document).on( 'click', '#FechFabr', function(event){
        Core.LoadMenu.show()
        Core.Fabricantes.GetCloseFabr( this, function(){
            $( '#TabFabr' ).click();
            $( '#FiltBtnFabr' ).click();
            Core.LoadMenu.hide();
        });
    });
    /*--FECHA AVISO*/
    $(document).off( 'hidden.bs.modal', '#MensMenu' );
    $(document).on( 'hidden.bs.modal', '#MensMenu', function(event){
        if ( vFocuFabr != '' ){
            $( vFocuFabr ).select();
            $( vFocuFabr ).focus();
        };
    })
});
