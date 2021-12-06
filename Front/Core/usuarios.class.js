/*CARREGA CLASSE CORE DO SISTEMA*/
import Core from './Core.class.js';

/**
 * Esta classe e responsavel pelo Menu
 * do sistema
 *
 * @package    Usuarios
 * @author     Alexandre Farinelli Zardo
 * @copyright  (c) 2021 Megatron
*/
export default class Usuarios {
	/**
	 * Retorna valor do campo 
	 * na linha selecionada da tabela 
	 *
	 * @return Dados campo
	 * @access public
	*/
	static GetDataTableUsua( vTabela, vLinha, vCampo ) {
		vTabela = $( vTabela ).DataTable();

		switch ( vCampo ){ 
			case 'usua_cada_iden': 
				return vTabela.cell( vLinha, 1 ).data();
				break;
			case 'usua_cada_nome':
				return vTabela.cell( vLinha, 2 ).data();
				break;
			case 'usua_cada_tipo':
				return vTabela.cell( vLinha, 3 ).data();
				break;
			case 'usua_cada_login':
				return vTabela.cell( vLinha, 4 ).data();
				break;
			case 'usua_cada_status':
				return vTabela.cell( vLinha, 5 ).data();
				break;
			case 'usua_cada_tenant':
				return vTabela.cell( vLinha, 6 ).data();
				break;
			case 'usua_cada_empre':
				return vTabela.cell( vLinha, 7 ).data();
				break;
			case 'usua_cada_adm':
				return vTabela.cell( vLinha, 8 ).data();
				break;
		};
	};
	
	/**
	 * Inicia Tabela com os dados 
	 *
	 * @param  vTabela - Id Tabela que sera implementada
	 * @param  vFiltros - Array contendo os filtros
	 * @param  vResp - Calback
	 * @return Calback
	 * @access public
	*/
	static GetTableUsua( vTabela, vFiltros, vResp ) {
		Core.SetAjax(
			vFiltros,
			'../../Comum/Usuarios/GetUsua/', function( vRespAjax ){
				if ( vRespAjax.status == 'sucesso' ){
					vTabela = $( vTabela ).DataTable({
						fixedHeader: true,
						info: true,
						scrollCollapse: true,
						retrieve: true,
						responsive: true,
						data: vRespAjax.registros,
						select: { style: 'single' },
						ordering: true,
						order: [ [ 2, 'asc' ] ],
						columns: [
							{ data: 'usua_cada_boto' },
							{ data: 'usua_cada_iden' },
							{ data: 'usua_cada_nome' },
							{ data: 'usua_cada_tipo' },
							{ data: 'usua_cada_login' },
							{ data: 'usua_cada_status', render: function(d) {
								if ( d == 0 ) {
									return 'INATIVO';
								} else if ( d == 1 ) {
									return 'ATIVO';
								};
							} },
							{ data: 'usua_cada_tenant', visible: false },
							{ data: 'usua_cada_empre', visible: false },
							{ data: 'usua_cada_adm', visible: false },
						], 
						language: {
							"decimal": ",",
							"thousands": ".",
							"sEmptyTable": "Nenhum registro encontrado",
							"sInfo": "Mostrando de _START_ até _END_ de _TOTAL_ registros",
							"sInfoEmpty": "Mostrando 0 até 0 de 0 registros",
							"sInfoFiltered": "(Filtrados de _MAX_ registros)",
							"sInfoPostFix": "",
							"sInfofoThousands": ".",
							"sLengthMenu": "_MENU_ resultados por página",
							"sLoadingRecords": "Carregando...",
							"sProcessing": "Processando...",
							"sZeroRecords": "Nenhum registro encontrado",
							"sSearch": "Pesquisar",
							"oPaginate": {
								"sNext": "Próximo",
								"sPrevious": "Anterior",
								"sFirst": "Primeiro",
								"sLast": "Último"
							},
							"oAria": {
								"sSortAscending": ": Ordenar colunas de forma ascendente",
								"sSortDescending": ": Ordenar colunas de forma descendente"
							},
							"select": {
								"rows": {
								"_": "Selecionado %d linhas",
								"0": "Nenhuma linha selecionada",
								"1": "Selecionado 1 linha"
								},
							},
						},
						createdRow: function( row, data, dataIndex ) {
							if ( data[ 'usua_cada_status' ] == 0 ) {
								$( row ).addClass( 'bg-danger' );
							};
						},
					});
					vTabela.clear();
					vTabela.rows.add( vRespAjax.registros );
					vTabela.draw();
				} else {
					vTabela = $( vTabela ).DataTable();
				};
				vTabela.columns.adjust();		
				vResp ( vRespAjax );
			}
		);
		$( '#UsuaTable tbody' ).on( 'click', 'tr', function () {
			$('.selected').removeClass('selected');
			$( this ).toggleClass( 'selected' );
		});
	};

	/**
	 * Método para gerar formulario
	 * no sistema
	 * 
	 * @return Aba e formulário
	 * @access public
	*/
	static GetForm( vResObjPai, vAba, vApelido, vResp ) {
		if ( $( vResObjPai ).find( '#' + vAba + 'TabUsua' ).length == 0 ){
			$( vResObjPai ).find( 'ul' ).append(
				'<li class="nav-item" role="presentation">' +
					'<button class="nav-link" id="' + vAba + 'TabUsua" data-bs-toggle="tab" data-bs-target="#' + vAba + 'ListUsua" type="button" role="tab" aria-controls="home" aria-selected="true"> <i class="fas fa-users"></i> ' + vApelido + ' </button>' +
				'</li>'
			);
			$( vResObjPai ).find( 'div:eq(0)' ).append(
				'<div class="tab-pane fade" id="' + vAba + 'ListUsua" role="tabpanel" aria-labelledby="' + vAba + '-tab-usuarios">' +
					'<div class="row p-3" >' +
						'<div class="col-xl-1">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="IdenUsua" value="Automatico" disabled>' +
								'<label for="IdenUsua">ID Reg.</label>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-11">' +
							'<div class="form-floating">' +
								'<input type="text" class="form-control" id="NomeUsua" value="" placeholder="" maxlength="150" required autofocus uppercase data-obriga="S">' +
								'<label for="NomeUsua">Nome</label>' +
								'<div class="invalid-feedback">' +
									'Nome do usuário não pode ficar em branco' +
								'</div>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-8">' +
							'<div class="form-floating has-validation">' +
								'<input type="text" class="form-control" id="LogiUsua" placeholder="algumacoisa@dominio.com.br" aria-describedby="LogiUsuaDupli" maxlength="150" required data-obriga="S">' +
								'<label for="LogiUsua">E-mail / Login</label>' +
								'<div id="LogiUsuaDupli" class="invalid-feedback">' +
								'</div>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-4">' +
							'<div class="form-floating">' +
								'<select class="form-select" id="TipoUsua" placeholder="Selecione um Opção" aria-label="Floating label select example">' +
									'<option value="ADMINISTRADOR">ADMINISTRADOR</option>' +
									'<option value="ADMINISTRADOR TENANT">ADMINISTRADOR TENANT</option>' +
									'<option value="USUÁRIO" selected>USUÁRIO</option>' +
						  		'</select>' +
								'<label for="TipoUsua">Tipo</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-6">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="TenanUsua">Tenant</label>' +
								'<select class="form-select" id="TenanUsua" aria-label="Floating label select example">' +
									'<option value="0">	TODAS AS TENANTES (INQUILINOS) </option>' +
						  		'</select>' +
							'</div>' +
						'</div>' +
						'<div class="col-xl-6">' +
							'<div class="input-group input-group-lg">' +
								'<label class="input-group-text" for="EmprUsua">Empresa</label>' +
								'<select class="form-select" id="EmprUsua" aria-label="Floating label select example">' +
									'<option value="0">	TODAS AS EMPRESAS </option>' +
						  		'</select>' +
							'</div>' +
						'</div>' +
					'</div>' +
					'<div class="row p-3" >' +
						'<div class="col-xl-2">' +
							'<div class="form-floating">' +
								'<select class="form-select" id="StatUsua" aria-label="Floating label select example">' +
									'<option value="0">INATIVO</option>' +
									'<option value="1" selected>ATIVO</option>' +
						  		'</select>' +
								'<label for="StatUsua">Status</label>' +
							'</div>' +
						'</div>' +
					'</div>' +
					Usuarios.GetPermForm( ) +
					'</br>' +
					'</br>' +
					'</br>' +
					'<div class="fixed-bottom d-flex justify-content-center">' + 
						'<button id="SalvUsua" type="button" class="btn btn-lg btn-success me-1"> <i class="fas fa-save"></i> Salvar </button>' +
						'<button id="FechUsua"type="button" class="btn btn-lg btn-primary"> <i class="fas fa-door-open"></i> Sair </button>' +
					'</div>' +
				'</div>'
			);
		};
		$( vResObjPai ).find( '#' + vAba + 'TabUsua' ).click();
		vResp( $( vResObjPai ).find( '#' + vAba + 'ListUsua' ) );
	}
	
	/**
	 * Método para gerar formulario permissão
	 * no sistema
	 * 
	 * @return formulário
	 * @access public
	*/
	static GetPermForm() {
		return '<div id="PermUsua">' +
			'<div class="row p-3" >' +
				'<div class="col-xl-4">' +
					'<div class="card">' +
						'<div class="card-header"> '+
							'<i class="fas fa-users"></i> Modulo: Usuários' +
						'</div>' +
						'<ul class="list-group list-group-flush">' +
							'<li class="list-group-item ps-5">' +
								'<input id="11_PermUsua" class="form-check-input me-1" type="checkbox" value="11" aria-label="...">' +
								'Acessar' +
							'</li>' +
							'<li class="list-group-item ps-5">' +
								'<input id="12_PermUsua" class="form-check-input me-1" type="checkbox" value="12" aria-label="...">' +
								'Incluir' +
							'</li>' +
							'<li class="list-group-item ps-5">' +
								'<input id="13_PermUsua" class="form-check-input me-1" type="checkbox" value="13" aria-label="...">' +
								'Alterar' +
							'</li>' +
							'<li class="list-group-item ps-5">' +
								'<input id="14_PermUsua" class="form-check-input me-1" type="checkbox" value="14" aria-label="...">' +
								'Excluir' +
							'</li>' +
						'</ul>' +
					'</div>' +
				'</div>' +
				'<div class="col-xl-4">' +
					'<div class="card">' +
						'<div class="card-header"> '+
							'<i class="far fa-building"></i> Modulo: Empresas' +
						'</div>' +
						'<ul class="list-group list-group-flush">' +
							'<li class="list-group-item ps-5">' +
								'<input id="31_PermUsua" class="form-check-input me-1" type="checkbox" value="31" aria-label="...">' +
								'Acessar' +
							'</li>' +
							'<li class="list-group-item ps-5">' +
								'<input id="32_PermUsua" class="form-check-input me-1" type="checkbox" value="32" aria-label="...">' +
								'Incluir' +
							'</li>' +
							'<li class="list-group-item ps-5">' +
								'<input id="33_PermUsua" class="form-check-input me-1" type="checkbox" value="33" aria-label="...">' +
								'Alterar' +
							'</li>' +
							'<li class="list-group-item ps-5">' +
								'<input id="34_PermUsua" class="form-check-input me-1" type="checkbox" value="34" aria-label="...">' +
								'Excluir' +
							'</li>' +
						'</ul>' +
					'</div>' +
				'</div>' +
				'<div class="col-xl-4">' +
					'<div class="card">' +
						'<div class="card-header"> '+
							'<i class="fas fa-briefcase"></i> Modulo: Clientes' +
						'</div>' +
						'<ul class="list-group list-group-flush">' +
							'<li class="list-group-item ps-5">' +
								'<input id="41_PermUsua" class="form-check-input me-1" type="checkbox" value="41" aria-label="...">' +
								'Acessar' +
							'</li>' +
							'<li class="list-group-item ps-5">' +
								'<input id="42_PermUsua" class="form-check-input me-1" type="checkbox" value="42" aria-label="...">' +
								'Incluir' +
							'</li>' +
							'<li class="list-group-item ps-5">' +
								'<input id="43_PermUsua" class="form-check-input me-1" type="checkbox" value="43" aria-label="...">' +
								'Alterar' +
							'</li>' +
							'<li class="list-group-item ps-5">' +
								'<input id="44_PermUsua" class="form-check-input me-1" type="checkbox" value="44" aria-label="...">' +
								'Excluir' +
							'</li>' +
						'</ul>' +
					'</div>' +
				'</div>' +
			'</div>' +
			Usuarios.GetPermForm2() +
			Usuarios.GetPermForm3() +
			Usuarios.GetPermForm4() +
			Usuarios.GetPermForm5() +
			Usuarios.GetPermForm6() +
		'</div>';
	};

	/**
	 * Método para gerar formulario permissão 2
	 * no sistema
	 * 
	 * @return formulário
	 * @access public
	*/
	static GetPermForm2() {
		return '<div class="row p-3" >' +
			'<div class="col-xl-4">' +
				'<div class="card">' +
					'<div class="card-header"> '+
						'<i class="fas fa-industry"></i> Modulo: Fabricantes' +
					'</div>' +
					'<ul class="list-group list-group-flush">' +
						'<li class="list-group-item ps-5">' +
							'<input id="51_PermUsua" class="form-check-input me-1" type="checkbox" value="51" aria-label="...">' +
							'Acessar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="52_PermUsua" class="form-check-input me-1" type="checkbox" value="52" aria-label="...">' +
							'Incluir' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="53_PermUsua" class="form-check-input me-1" type="checkbox" value="53" aria-label="...">' +
							'Alterar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="54_PermUsua" class="form-check-input me-1" type="checkbox" value="54" aria-label="...">' +
							'Excluir' +
						'</li>' +
					'</ul>' +
				'</div>' +
			'</div>' +
			'<div class="col-xl-4">' +
				'<div class="card">' +
					'<div class="card-header"> '+
						'<i class="far fa-building"></i> Modulo: Materiais' +
					'</div>' +
					'<ul class="list-group list-group-flush">' +
						'<li class="list-group-item ps-5">' +
							'<input id="61_PermUsua" class="form-check-input me-1" type="checkbox" value="61" aria-label="...">' +
							'Acessar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="62_PermUsua" class="form-check-input me-1" type="checkbox" value="62" aria-label="...">' +
							'Incluir' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="63_PermUsua" class="form-check-input me-1" type="checkbox" value="63" aria-label="...">' +
							'Alterar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="64_PermUsua" class="form-check-input me-1" type="checkbox" value="64" aria-label="...">' +
							'Excluir' +
						'</li>' +
					'</ul>' +
				'</div>' +
			'</div>' +
			'<div class="col-xl-4">' +
				'<div class="card">' +
					'<div class="card-header"> '+
						'<i class="fas fa-briefcase"></i> Modulo: Áreas' +
					'</div>' +
					'<ul class="list-group list-group-flush">' +
						'<li class="list-group-item ps-5">' +
							'<input id="71_PermUsua" class="form-check-input me-1" type="checkbox" value="71" aria-label="...">' +
							'Acessar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="72_PermUsua" class="form-check-input me-1" type="checkbox" value="72" aria-label="...">' +
							'Incluir' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="73_PermUsua" class="form-check-input me-1" type="checkbox" value="73" aria-label="...">' +
							'Alterar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="74_PermUsua" class="form-check-input me-1" type="checkbox" value="74" aria-label="...">' +
							'Excluir' +
						'</li>' +
					'</ul>' +
				'</div>' +
			'</div>' +
		'</div>';
	}	
	
	/**
	 * Método para gerar formulario permissão 3
	 * no sistema
	 * 
	 * @return formulário
	 * @access public
	*/
	static GetPermForm3() {
		return '<div class="row p-3" >' +
			'<div class="col-xl-4">' +
				'<div class="card">' +
					'<div class="card-header"> '+
						'<i class="fas fa-fill-drip"></i> Modulo: Cad. Amostras' +
					'</div>' +
					'<ul class="list-group list-group-flush">' +
						'<li class="list-group-item ps-5">' +
							'<input id="81_PermUsua" class="form-check-input me-1" type="checkbox" value="81" aria-label="...">' +
							'Acessar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="82_PermUsua" class="form-check-input me-1" type="checkbox" value="82" aria-label="...">' +
							'Incluir' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="83_PermUsua" class="form-check-input me-1" type="checkbox" value="83" aria-label="...">' +
							'Alterar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="84_PermUsua" class="form-check-input me-1" type="checkbox" value="84" aria-label="...">' +
							'Excluir' +
						'</li>' +
					'</ul>' +
				'</div>' +
			'</div>' +
			'<div class="col-xl-4">' +
				'<div class="card">' +
					'<div class="card-header"> '+
						'<i class="fas fa-microscope"></i> Modulo: Metalográfico' +
					'</div>' +
					'<ul class="list-group list-group-flush">' +
						'<li class="list-group-item ps-5">' +
							'<input id="91_PermUsua" class="form-check-input me-1" type="checkbox" value="91" aria-label="...">' +
							'Acessar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="92_PermUsua" class="form-check-input me-1" type="checkbox" value="92" aria-label="...">' +
							'Incluir' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="93_PermUsua" class="form-check-input me-1" type="checkbox" value="93" aria-label="...">' +
							'Alterar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="94_PermUsua" class="form-check-input me-1" type="checkbox" value="94" aria-label="...">' +
							'Excluir' +
						'</li>' +
					'</ul>' +
				'</div>' +
			'</div>' +
			'<div class="col-xl-4">' +
				'<div class="card">' +
					'<div class="card-header"> '+
						'<i class="fas fa-compress-arrows-alt"></i> Modulo: Achatamento / Expansão' +
					'</div>' +
					'<ul class="list-group list-group-flush">' +
						'<li class="list-group-item ps-5">' +
							'<input id="101_PermUsua" class="form-check-input me-1" type="checkbox" value="101" aria-label="...">' +
							'Acessar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="102_PermUsua" class="form-check-input me-1" type="checkbox" value="102" aria-label="...">' +
							'Incluir' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="103_PermUsua" class="form-check-input me-1" type="checkbox" value="103" aria-label="...">' +
							'Alterar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="104_PermUsua" class="form-check-input me-1" type="checkbox" value="104" aria-label="...">' +
							'Excluir' +
						'</li>' +
					'</ul>' +
				'</div>' +
			'</div>' +
		'</div>';
	}

	/**
	 * Método para gerar formulario permissão 4
	 * no sistema
	 * 
	 * @return formulário
	 * @access public
	*/
	static GetPermForm4() {
		return '<div class="row p-3" >' +
			'<div class="col-xl-4">' +
				'<div class="card">' +
					'<div class="card-header"> '+
						'<i class="fas fa-magnet"></i> Modulo: Dobramento' +
					'</div>' +
					'<ul class="list-group list-group-flush">' +
						'<li class="list-group-item ps-5">' +
							'<input id="111_PermUsua" class="form-check-input me-1" type="checkbox" value="111" aria-label="...">' +
							'Acessar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="112_PermUsua" class="form-check-input me-1" type="checkbox" value="112" aria-label="...">' +
							'Incluir' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="113_PermUsua" class="form-check-input me-1" type="checkbox" value="113" aria-label="...">' +
							'Alterar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="114_PermUsua" class="form-check-input me-1" type="checkbox" value="114" aria-label="...">' +
							'Excluir' +
						'</li>' +
					'</ul>' +
				'</div>' +
			'</div>' +
			'<div class="col-xl-4">' +
				'<div class="card">' +
					'<div class="card-header"> '+
						'<i class="fab fa-creative-commons-remix"></i> Modulo: Dureza' +
					'</div>' +
					'<ul class="list-group list-group-flush">' +
						'<li class="list-group-item ps-5">' +
							'<input id="115_PermUsua" class="form-check-input me-1" type="checkbox" value="115" aria-label="...">' +
							'Acessar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="116_PermUsua" class="form-check-input me-1" type="checkbox" value="116" aria-label="...">' +
							'Incluir' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="117_PermUsua" class="form-check-input me-1" type="checkbox" value="117" aria-label="...">' +
							'Alterar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="118_PermUsua" class="form-check-input me-1" type="checkbox" value="118" aria-label="...">' +
							'Excluir' +
						'</li>' +
					'</ul>' +
				'</div>' +
			'</div>' +
			'<div class="col-xl-4">' +
				'<div class="card">' +
					'<div class="card-header"> '+
						'<i class="fas fa-weight"></i> Modulo: Charpy' +
					'</div>' +
					'<ul class="list-group list-group-flush">' +
						'<li class="list-group-item ps-5">' +
							'<input id="119_PermUsua" class="form-check-input me-1" type="checkbox" value="119" aria-label="...">' +
							'Acessar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="120_PermUsua" class="form-check-input me-1" type="checkbox" value="120" aria-label="...">' +
							'Incluir' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="121_PermUsua" class="form-check-input me-1" type="checkbox" value="121" aria-label="...">' +
							'Alterar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="122_PermUsua" class="form-check-input me-1" type="checkbox" value="122" aria-label="...">' +
							'Excluir' +
						'</li>' +
					'</ul>' +
				'</div>' +
			'</div>' + 
		'</div>';
	}

	/**
	 * Método para gerar formulario permissão 5
	 * no sistema
	 * 
	 * @return formulário
	 * @access public
	*/
	static GetPermForm5() {
		return '<div class="row p-3" >' +
			'<div class="col-xl-4">' +
				'<div class="card">' +
					'<div class="card-header"> '+
						'<i class="far fa-eye"></i> Modulo: Macrografia' +
					'</div>' +
					'<ul class="list-group list-group-flush">' +
						'<li class="list-group-item ps-5">' +
							'<input id="123_PermUsua" class="form-check-input me-1" type="checkbox" value="123" aria-label="...">' +
							'Acessar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="124_PermUsua" class="form-check-input me-1" type="checkbox" value="124" aria-label="...">' +
							'Incluir' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="125_PermUsua" class="form-check-input me-1" type="checkbox" value="125" aria-label="...">' +
							'Alterar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="126_PermUsua" class="form-check-input me-1" type="checkbox" value="126" aria-label="...">' +
							'Excluir' +
						'</li>' +
					'</ul>' +
				'</div>' +
			'</div>' +
			'<div class="col-xl-4">' +
				'<div class="card">' +
					'<div class="card-header"> '+
						'<i class="fas fa-cube"></i> Modulo: P. Camada Endurecida' +
					'</div>' +
					'<ul class="list-group list-group-flush">' +
						'<li class="list-group-item ps-5">' +
							'<input id="127_PermUsua" class="form-check-input me-1" type="checkbox" value="127" aria-label="...">' +
							'Acessar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="128_PermUsua" class="form-check-input me-1" type="checkbox" value="128" aria-label="...">' +
							'Incluir' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="129_PermUsua" class="form-check-input me-1" type="checkbox" value="129" aria-label="...">' +
							'Alterar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="130_PermUsua" class="form-check-input me-1" type="checkbox" value="130" aria-label="...">' +
							'Excluir' +
						'</li>' +
					'</ul>' +
				'</div>' +
			'</div>' +
			'<div class="col-xl-4">' +
				'<div class="card">' +
					'<div class="card-header"> '+
						'<i class="fas fa-vials"></i> Modulo: Quimíco' +
					'</div>' +
					'<ul class="list-group list-group-flush">' +
						'<li class="list-group-item ps-5">' +
							'<input id="131_PermUsua" class="form-check-input me-1" type="checkbox" value="131" aria-label="...">' +
							'Acessar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="132_PermUsua" class="form-check-input me-1" type="checkbox" value="132" aria-label="...">' +
							'Incluir' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="133_PermUsua" class="form-check-input me-1" type="checkbox" value="133" aria-label="...">' +
							'Alterar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="134_PermUsua" class="form-check-input me-1" type="checkbox" value="134" aria-label="...">' +
							'Excluir' +
						'</li>' +
					'</ul>' +
				'</div>' +
			'</div>' +
		'</div>';
	}

	/**
	 * Método para gerar formulario permissão 5
	 * no sistema
	 * 
	 * @return formulário
	 * @access public
	*/
	static GetPermForm6() {
		return '<div class="row p-3" >' +
			'<div class="col-xl-4">' +
				'<div class="card">' +
					'<div class="card-header"> '+
						'<i class="fas fa-arrows-alt-v"></i> Modulo: Tração' +
					'</div>' +
					'<ul class="list-group list-group-flush">' +
						'<li class="list-group-item ps-5">' +
							'<input id="135_PermUsua" class="form-check-input me-1" type="checkbox" value="135" aria-label="...">' +
							'Acessar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="136_PermUsua" class="form-check-input me-1" type="checkbox" value="136" aria-label="...">' +
							'Incluir' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="137_PermUsua" class="form-check-input me-1" type="checkbox" value="137" aria-label="...">' +
							'Alterar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="138_PermUsua" class="form-check-input me-1" type="checkbox" value="138" aria-label="...">' +
							'Excluir' +
						'</li>' +
					'</ul>' +
				'</div>' +
			'</div>' +
		'</div>';
	}

	/**
	 * Método para gerar permissão tenant
	 * no sistema
	 * 
	 * @return formulário
	 * @access public
	*/
	static GetPermTenan() {
		return '<div class="row p-3" >' +
			'<div class="col-xl-4">' +
				'<div class="card">' +
					'<div class="card-header"> '+
						'<i class="fas fa-gopuram"></i> Modulo: Tenant (Inquilino)' +
					'</div>' +
					'<ul class="list-group list-group-flush">' +
						'<li class="list-group-item ps-5">' +
							'<input id="21_PermUsua" class="form-check-input me-1" type="checkbox" value="21" aria-label="...">' +
							'Acessar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="22_PermUsua" class="form-check-input me-1" type="checkbox" value="22" aria-label="...">' +
							'Incluir' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="23_PermUsua" class="form-check-input me-1" type="checkbox" value="23" aria-label="...">' +
							'Alterar' +
						'</li>' +
						'<li class="list-group-item ps-5">' +
							'<input id="24_PermUsua" class="form-check-input me-1" type="checkbox" value="24" aria-label="...">' +
							'Excluir' +
						'</li>' +
					'</ul>' +
				'</div>' +
			'</div>' + 
		'</div>';
	}

	/**
	 * Método para incluir
	 * no sistema
	 * 
	 * @param  VThis - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static GetAddUsua( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'FormUsua' ], function( ResObjPai ){
			Usuarios.GetForm( ResObjPai, 'Add', 'INCLUSÃO USUÁRIOS', function( ResObjPai ){
				Core.SetAjax( { evento: { tenant_cada_stat: '1' } }, '../../Comum/Usuarios/GetTenanUsua/', function( Resposta ){
					Core.SetSele2( $( ResObjPai ).find( '#TenanUsua' ), Resposta.registros, function(){
						Core.SetAjax( { evento: {
							empre_cada_stat: '1',
							empre_cada_tenant: $( ResObjPai ).find( '#TenanUsua' ).val(),
						} }, '../../Comum/Usuarios/GetEmpreUsua/', function( Resposta ){
							if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
								$( ResObjPai ).find( '#TenanUsua' ).val(  Core.Login.GetUsuaSess( 'usua_cada_tenant' ) ).trigger( 'change' );
								$( ResObjPai ).find( '#TenanUsua' ).prop( 'disabled', true );
							} else {
								$( ResObjPai ).find( '#PermUsua' ).prepend( 
									Core.Usuarios.GetPermTenan()
								);
							};
							Core.SetSele2( $( ResObjPai ).find( '#EmprUsua' ), Resposta.registros, function(){
								if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
									$( ResObjPai ).find( '#EmprUsua' ).prop( 'disabled', true );
								};
								setTimeout( function(){
									vResp( ResObjPai );
								}, 300);
							});
						});
					});
				});
			});
		});
	};

	/**
	 * Método para alterar
	 * no sistema
	 * 
	 * @param  VThis - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static GetEdtUsua( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.GetObjtPai( VThis, [ 'FormUsua' ], function( ResObjPai ){
			Usuarios.GetForm( ResObjPai, 'Edt', 'ALTERAÇÃO USUÁRIOS', function( ResObjPai ){
				Core.SetAjax( { evento: { tenant_cada_stat: '1' } }, '../../Comum/Usuarios/GetTenanUsua/', function( Resposta ){
					Core.SetSele2( $( ResObjPai ).find( '#TenanUsua' ), Resposta.registros, function(){
						Core.SetAjax( { evento: {
							empre_cada_stat: '1',
							empre_cada_tenant: $( ResObjPai ).find( '#TenanUsua' ).val(),
						} }, '../../Comum/Usuarios/GetEmpreUsua/', function( Resposta ){
							Core.SetSele2( $( ResObjPai ).find( '#EmprUsua' ), Resposta.registros, function(){
								$( ResObjPai ).find( '#IdenUsua' ).val(  Core.Usuarios.GetDataTableUsua( '#UsuaTable', vLinha, 'usua_cada_iden' ) );
								$( ResObjPai ).find( '#NomeUsua' ).val(  Core.Usuarios.GetDataTableUsua( '#UsuaTable', vLinha, 'usua_cada_nome' ) );
								$( ResObjPai ).find( '#TipoUsua' ).val(  Core.Usuarios.GetDataTableUsua( '#UsuaTable', vLinha, 'usua_cada_tipo' ) );
								$( ResObjPai ).find( '#LogiUsua' ).val(  Core.Usuarios.GetDataTableUsua( '#UsuaTable', vLinha, 'usua_cada_login' ) );
								$( ResObjPai ).find( '#StatUsua' ).val(  Core.Usuarios.GetDataTableUsua( '#UsuaTable', vLinha, 'usua_cada_status' ) );
								$( ResObjPai ).find( '#TenanUsua' ).val(  Core.Usuarios.GetDataTableUsua( '#UsuaTable', vLinha, 'usua_cada_tenant' ) ).trigger( 'change' );
								if ( Core.Login.GetUsuaSess( 'usua_cada_tenant' ) != 0 ){
									$( ResObjPai ).find( '#TenanUsua' ).prop( 'disabled', true );
								} else {
									$( ResObjPai ).find( '#PermUsua' ).prepend( 
										Core.Usuarios.GetPermTenan()
									);
								};
								$( ResObjPai ).find( '#EmprUsua' ).val(  Core.Usuarios.GetDataTableUsua( '#UsuaTable', vLinha, 'usua_cada_empre' ) ).trigger( 'change' );
								if ( Core.Login.GetUsuaSess( 'usua_cada_empre' ) != 0 ){
									$( ResObjPai ).find( '#EmprUsua' ).prop( 'disabled', true );
								};
								Usuarios.SetPermUsua( ResObjPai, {
									evento:{
										usua_aces_cada_usua_iden: Core.Usuarios.GetDataTableUsua( '#UsuaTable', vLinha, 'usua_cada_iden' )
									}}, function(){
										setTimeout( function(){
											vResp( ResObjPai );
										}, 300);
									}
								);
							});
						});
					});
				});
			});
		});
	};

	/**
	 * Método para sair tela
	 * no sistema
	 * 
	 * @param  VThis - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static GetCloseUsua( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListUsua', 'EdtListUsua' ], function( ResObjPai ){
			$( '#' + $( ResObjPai ).attr( 'id' ).replace( 'List', 'Tab' ) ).remove();
			$( ResObjPai ).remove();
			vResp( ResObjPai );
		});
	};

	/**
	 * Método para salvar
	 * no sistema
	 * 
	 * @param  VThis - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static SetSalvUsua( VThis, vResp ) {
		Core.GetObjtPai( VThis, [ 'AddListUsua', 'EdtListUsua' ], function( ResObjPai ){
			Core.GetCampObri( ResObjPai, [ '' ], '[data-obriga="S"]', function( ResObjVali ){
				$( '.has-validated' ).removeClass( 'has-validated' );
                $( '.is-invalid' ).removeClass( 'is-invalid' );
				if ( ResObjVali != 'validado' ){
					$( ResObjVali ).parent().addClass( 'has-validated' );
                    $( ResObjVali ).addClass( 'is-invalid' );
					setTimeout( function(){
						vResp( { vResObjPai: ResObjPai, vResObjVali: ResObjVali } );
					}, 300);
                } else {
					Usuarios.GetPermUsua( ResObjPai, function( vRetoPermUsua ){
						Core.SetAjax({
							evento:{
								IdenUsua: $( ResObjPai ).find( '#IdenUsua' ).val(),
								NomeUsua: $( ResObjPai ).find( '#NomeUsua' ).val(),
								LogiUsua: $( ResObjPai ).find( '#LogiUsua' ).val(),
								TipoUsua: $( ResObjPai ).find( '#TipoUsua' ).val(),
								TenanUsua: $( ResObjPai ).find( '#TenanUsua' ).val(),
								EmprUsua: $( ResObjPai ).find( '#EmprUsua' ).val(),
								StatUsua: $( ResObjPai ).find( '#StatUsua' ).val(),
								PermUsua: JSON.stringify( vRetoPermUsua ),
							}},
							'../../Comum/Usuarios/SetSalvUsua/', function( vRespAjax ){
								Core.SetMensMenu( vRespAjax.detalhes, vRespAjax.registros, 'AVISO')
								Core.MensMenu.show();
								setTimeout( function(){
									vResp( { vResObjPai: ResObjPai, vRespAjax: vRespAjax } );
								}, 300);
							},
						);
					});
				};
			})
		});
	};

	/**
	 * Método para excluir
	 * no sistema
	 * 
	 * @param  VThis - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static SetDeleUsua( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.SetAjax({
			evento:{
				IdenUsua: Core.Usuarios.GetDataTableUsua( '#UsuaTable', vLinha, 'usua_cada_iden' ),
			}},
			'../../Comum/Usuarios/SetDeleUsua/', function( vRespAjax ){
				Core.SetMensMenu( vRespAjax.detalhes, vRespAjax.registros, 'AVISO')
				Core.MensMenu.show();
				setTimeout( function(){
					vResp( vRespAjax );
				}, 300);
			},
		);
	};

	/**
	 * Método para resetar senha
	 * no sistema
	 * 
	 * @param  VThis - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static SetReseSenhUsua( VThis, vResp ) {
		var vLinha = $( VThis ).parent().parent();
		Core.SetAjax({
			evento:{
				IdenUsua: Core.Usuarios.GetDataTableUsua( '#UsuaTable', vLinha, 'usua_cada_iden' ),
				NomeUsua: Core.Usuarios.GetDataTableUsua( '#UsuaTable', vLinha, 'usua_cada_nome' ),
				LogiUsua: Core.Usuarios.GetDataTableUsua( '#UsuaTable', vLinha, 'usua_cada_login' ),
			}},
			'../../Comum/Usuarios/SetReseSenhUsua/', function( vRespAjax ){
				Core.SetMensMenu( vRespAjax.detalhes, vRespAjax.registros, 'AVISO')
				Core.MensMenu.show();
				setTimeout( function(){
					vResp( vRespAjax );
				}, 300);
			},
		);
	};


	/**
	 * Método para exibir permissões
	 * no sistema
	 * 
	 * @param  VResObjPai - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static SetPermUsua( VResObjPai, vFiltros, vResp ) {
		Core.SetAjax(
			vFiltros,
			'../../Comum/Usuarios/GetPermUsua/', function( vRespAjax ){
				for ( var i = 0; i < vRespAjax.registros.length; i++) {
					var ObjPermUsua = vRespAjax.registros[i];
					$( VResObjPai ).find( '#' + ObjPermUsua.usua_aces_cada_opca_iden + '_PermUsua' ).prop( 'checked', false );
					if ( ObjPermUsua.usua_aces_cada_opca_stat == 1 ){
						$( VResObjPai ).find( '#' + ObjPermUsua.usua_aces_cada_opca_iden + '_PermUsua' ).prop( 'checked', true );
					};
				};
				setTimeout( function(){
					vResp( vRespAjax );
				}, 300);
			}
		);
	};

	/**
	 * Método para gerar array permissões
	 * no sistema
	 * 
	 * @param  VResObjPai - Objeto de origem do evento
	 * @param  vResp - calback
	 * @return calback
	 * @access public
	*/
	static GetPermUsua( VResObjPai, vResp ) {
		var PermUsua = {};
		$( VResObjPai ).find( '#PermUsua' ).find('input').each( function( RegIde ){
			var CampPermUsua = {};
    		CampPermUsua['usua_aces_cada_opca_iden'] = $( this ).val();
    		CampPermUsua['usua_aces_cada_opca_stat'] =  $( this ).is( ':checked' ) ;
    		PermUsua[ 'Regi' + RegIde ] = CampPermUsua;
		}); 
		setTimeout( function(){
			vResp( PermUsua );
		}, 300);
	};
};