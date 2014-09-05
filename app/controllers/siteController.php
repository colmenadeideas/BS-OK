<?php 
	
	class siteController extends Controller {
		
		public function __construct() {
			
			parent::__construct();	
		}
	
		public function index() {
			
			$this->loadModel('doctor');
			@$this->view->speciality = doctorModel::listSpeciality();
				
			$this->view->buildpage('site/index');			
		}
		
		public function search(){
			
			foreach ($_POST as $key => $value) {
								
				$campo = escape_value($key);
				$valor = escape_value($value);
				switch ($key) {
					case 'specialty':
						$specialty=$valor;
						break;	
					case 'city':
						$city=$valor;
						break;	
					case 'date':
						$date=$valor;
						break;	
				}
			}
			$this->model->search_list();
		}
	}
		
?>