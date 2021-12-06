/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from '../../Core/Core.class.js';

$(document).ready(function( ) {
    /*--INICIALIZAÇÃO MENU*/
    Core.SetLoadMenu();
    Core.LoadMenu.show();
    Core.Menu.GetMenuInicia();
    /*--CARREGA MODULO*/
    $(window).on( 'hashchange', function () {
        Core.Menu.GetMenuPagi( location.hash, function( vRespAjax ){
            Core.LoadMenu.hide();
        }); 
    }).trigger( 'hashchange' );
    /*--SELECIONA MENU*/
	$(document).on( 'click', '#ItemMenu', function(){
		$( '.nav' ).find( '.active' ).removeClass( 'active' );
		$( this ).parent().parent().parent().parent().find( 'a:eq(0)' ).addClass( 'active' );
        $( this ).parent().parent().parent().parent().find( 'a:eq(0)' ).click();
        $( this ).addClass( 'active' );
	})
    /*--SELECIONA MENU SAIR*/
	$(document).on( 'click', '#SairMenu', function(){
		Core.Menu.GetMenuSair();
	})
});