<?php
	namespace Back\Core;
	
	use TCPDF;

	/**
 	* Esta classe extende TCPDF.
 	* Para personalizar o cabeçalho
 	* e p rodapé.
 	*
 	* @package    Relatorio
 	* @author     Alexandre Farinelli Zardo
 	*/

	class Relatorio extends TCPDF {
		public $CabeHtml;
		public $CabeLogo;
		public $CabeSelo;

		public function Header(){
			$this->writeHTML( $this->CabeHtml, true, false, true, false, '');

			$horizontal_alignments = array('L', 'C', 'R');
			$fitbox = $horizontal_alignments[1].' ';
			$vertical_alignments = array('T', 'M', 'B');
			$fitbox[1] = $vertical_alignments[1];
				
			if ( $this->CabeLogo != '' ){
				$img_base64_encoded = base64_encode ( file_get_contents( $this->CabeLogo ) );
				$this->Image( '@'. base64_decode( $img_base64_encoded ), 11, 0, 26, 36, '', '', 'T', false, 300, '', false, false, 0, $fitbox, false, false);
			};

			if ( $this->CabeSelo != '' ){
				$img_base64_encoded = base64_encode ( file_get_contents( $this->CabeSelo ) );
				$this->Image( '@'. base64_decode( $img_base64_encoded ), 11, 500, 26, 36, '', '', 'T', false, 300, '', false, false, 0, $fitbox, false, false);
			};
		}

		public function Footer() {
			$this->SetY(-12);
			$this->SetFont('', '', 8);
			$this->Cell(0, 10, 'Impresso em '.date('d/m/Y').' - '.date('H:i'), 0, false, 'L', 0, '', 0, false, 'T', 'M');
			$this->Cell( 0, 10, 'Página '.$this->getAliasNumPage().' de '.$this->getAliasNbPages(), 0, false, 'R', 0, '', 0, false, 'T', 'M' );
		}
	};
?>