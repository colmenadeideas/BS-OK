<?php

class panelController extends Controller {

	public function __construct() {
		
		parent::__construct();
		//Auth::handleLogin('panel');
        $this->view->title = "Doctor PANEL";	 //Temporarly defined to avoid individual var
       // $this->view->user = $this->user->getUserdata(); //TODO Change  $this->view->username por $this->view->user
        $this->view->userdata  = array("id"=>"22", "username" => "dlarez", "role" => "doctor" 	);
		
	}
	
	public function index(){
        
		//$this->view->userdata = $this->user->getUserdata();		
		$this->view->buildpage("panel/appointments/next", "doctor");
	}
	
	public function appointments($date_range, $days) {
		
		//Get Next Appointments
		$this->view->appointments = $this->api-> appointments("array" , "doctor", $this->view->userdata[0]['id']);
		
		if ($this->view->appointments['tag'] == 'practices' && $this->view->appointments['empty'] == 1) {
			// Doctor hasn't add PRACTICES
			//TODO: suggest add practices
			$this->view->render("panel/appointments/none", "doctor");
			
		} else if ($this->view->appointments['tag'] == 'appointments' && $this->view->appointments['empty'] == 1) {
			
			$this->view->render("panel/appointments/none", "doctor");
			
		} else {
						 
			$this->view->render("panel/appointments/next", "doctor");
		}
	}

	
	/*public function index($id){
		
		//TODO pasar parametros desde variable
		
		$appointments = $this -> api ->appointments("array", "doctor", $id);
		
		if ($appointments['empty'] ==1){
			$this->view-> render('panel/head');
			$this->view-> render('panel/appointments_none');
			$this->view-> render('panel/footer');
		}else{
			//HAY CITAS
			
			
			//print_r($appointments);
							
				$this->view->appointments = $appointments;
				$patient = $this->api->patient($arreglo="json", $id);
			//page
			$this -> view -> render('panel/head');
			$this -> view -> render('panel/appointments_home');
			$this -> view -> render('panel/footer');
			
		
		}
	}*/

	public function patient($action) {
		$this->view->username=array("id"=>"22");
		switch ($action) {
			case 'id':
				$template = "id";
				break;
			case 'register':
				$template = "register";
				break;
			case 'step2':
				$template = "step2";
				break;	
			case 'step3':
				$template = "step3";
				break;					
			default:
				$template = "register";
				break;
		}

		$this->view->render("panel/patient/".$template);
	}
		

	function pruebaparadavid() {

		$array_practice['id_doctor'] 	= "22";
		// paso 1 el ID del doctor
		$reg = $this->model->getLastPractice("",$array_practice['id_doctor'], 'id_doctor');
		 echo $reg[0]['id'] ;
		 echo '<br>';
		 $array_practice['max_days_ahead'] 	= "66";
		
		 // paso 2 actualizar los datos del doctor co el iD encontrado en el paso 1
		$s = $this->helper->update('doctor_practice', $reg[0]['id'], $array_practice);
		

		$reg2 = $this->model->getLastPractice("",$array_practice['id_doctor'], 'id_doctor');
		print_r($reg2);
		// $reg = $this->model->getLastPractice("",$array_practice['id_doctor'], 'id_doctor');
		


	}

	public function practice($action, $secondparameter, $tempkey) {		

		switch ($action) {
			case 'add':
				//has
				//-- step 1
				//---- step 2
				//------ step 3
				//-------- step 4
				if (!empty($secondparameter)) {

					//Get Previous
					$tempdata = Api::getTempRecord("array", $this->view->userdata['id'], $tempkey);
					$this->view->tempkey = $tempdata[0]['tempkey'];
					$this->view->tempdata = json_decode($tempdata[0]['data'], TRUE);

					switch ($secondparameter) {
						case 'step2': 	$template = "add-days"; 	break;
						case 'step3':	$template = "add-quote";	break;
						case 'step4':	$template = "add-cost";		break;
						case 'step5':	$template = "add-preview";	break;
					}
				} else {
					$this->view->tempkey = generateTempKey($this->view->userdata["username"]);			
					$template = "add";
				}
			
				break;

			
			/*case 'quote':

				$template = "quote";

				//list
				$this->view->practices = $this->api-> practices("array" , "doctor", $this->view->userdata[0]['id']);

				if ($this->view->practices['empty'] != 1) {

					$template = "quote";

				} else {

					$template = "none";

				}

				break;
			case 'cost':
				$template = "cost";
				break;	*/			
			
			default:
				//list
				$this->view->practices = $this->api-> practices("array" , "doctor", /*$this->view->userdata[0]['id']*/ '22');

				if ($this->view->practices['empty'] != 1) {

					$template = "list";

				} else {

					$template = "none";

				}

			break;
		}

		$this->view->render("panel/practices/".$template);
	}

	function process ($what, $step="", $step_id="") {

		switch ($what) {

			case 'practice':
				$array_data = array();	
				
				foreach ($_POST as $key => $value) {
					$field = escape_value($key);
					$field_data = escape_value($value);	
					if ($field_data != "") { //only filled data?
						$array_data[$field] = $field_data;
					}
				}
				unset($array_data['submit']);
			
				if (!empty($step_id)){

					$template = "panel/practice/add/step".($step_id+1);	

					$this->temp("save", "noresponse");			

					switch ($step_id) {
						case 1: 							
							break;
						
						default:
							$previous = Api::getTempRecord("array", $array_data['id_doctor'], $array_data['tempkey']);
							if (!empty($previous)){
								$this->view->tempdata = json_decode($previous[0]['data'], TRUE);
							}							
							break;							
					}					
				
					$response["tag"] = "process";
					$response["success"] = 1;
					$response["error"] = 0;	
					$response["response"] = "saved";
					$response["template"] = $template;
					$response["tempkey"] = $array_data['tempkey'];
					
					echo json_encode($response);

				//PROCESS/PRACTICE ------
				} else { // IS SINGLE RECORD

					if ($array_data['isclinic'] == 1){
						if($array_data['clinic_id'] == "") { // TODO cambiar a 'empty'?
							$array_clinic['name'] 			= $array_data['clinic'];
							$array_clinic['address'] 		= $array_data['address'];

							//Create the clinic
							$insert_clinic = $this->helper->insert('clinic', $array_clinic);
							if ($insert_clinic > 0) {
								$array_data['clinic_id'] = DB::insertId();
							} else {
								//error
							}						
						}
						$array_practice['id_clinic'] 		= $array_data['clinic_id'];
						$array_practice['address_details'] 	= $array_data['address_details'];
					} 
					elseif ($array_data['isclinic'] == 0){			
						$array_practice['address_details'] 	= $array_data['address'];
					}
					
					$array_practice['id_doctor'] 			= $array_data['id_doctor'];
					$array_practice['max_days_ahead']		= $array_data['max_days_ahead'];
					$array_practice['manage_time_slots']	= $array_data['manage_time_slots'];

					//Create the Practice
					$insert_practice = $this->helper->insert('doctor_practice', $array_practice);
					
					if ($insert_practice > 0) {
						
						//Create Schedule
						$array_practice_schedule['id_practice'] 	= DB::insertId();

						for ($i=1; $i < 8; $i++) { 
							if ($array_data['day_'.$i] != ""){								
								$array_practice_schedule['day']				= $array_data['day_'.$i];
								$array_practice_schedule['ini_schedule']	= $array_data['ini_schedule_'.$i];
								$array_practice_schedule['end_schedule']	= $array_data['end_schedule_'.$i];
								if ($array_data['manage_time_slots'] == 1) {
									$array_practice_schedule['quota']			= -1; //Auto calculated
								} else {
									$array_practice_schedule['quota']			= $array_data['day_quote_'.$i];
								}

								$insert_schedule = $this->helper->insert('doctor_practice_schedule', $array_practice_schedule);
							}
						}
						//Create Reasons Matrix
						$array_intervals_matrix['id_practice'] 			= $array_practice_schedule['id_practice'];
						foreach ($array_data['reason'] as $key => $value) {
							$array_intervals_matrix['consultation_reason'] 	= $value;
							$array_intervals_matrix['initial_interval'] 	= $array_data['time'][$key];
							$array_intervals_matrix['price'] 				= $array_data['price'][$key];

							$insert_intervals_matrix = $this->helper->insert('doctor_practice_schedule_intervals_matrix', $array_intervals_matrix);
						}

						//DELETE TEMP DATA
						$this->helper->delete('temporal_data', $array_data['tempkey'], 'tempkey');

						$response["tag"] = "process";
						$response["success"] = 1;
						$response["error"] = 0;	
						$response["response"] = "saved";
						//$response["template"] = $template;
						//$response["tempkey"] = $array_data['tempkey'];

						echo json_encode($response);

					} else {
						//error
					}
					
				}
				break;			
		}
	}
	



	function processquote() {
			
			$array_data = array();	
			$array_quote = array();
			
			foreach ($_POST as $key => $value) {
				$field = escape_value($key);
				$field_data = escape_value($value);				
				$array_data[$field] = $field_data;
			}
			
			
			
			//$array_quote['id_practice'] = $array_data['id_practice'];
			
			//for ($x = 0; $x <= 6; $x++) {
				//$day="day_".$x;
				//$array_quote['day'] = $array_data[$day];
			//	$array_quote['quota'] = $array_data['quota'];
				
			//	$array_quote['id_practice']=11;
			//	$array_quote['quota']=15;
				
			  
				//$insert_quote = $this->helper->insert('doctor_practice', $array_quote);
				
				//static function update($tablename, $id, $vars, $by ='id'){
				//$insert_quote = $this->helper->update('doctor_practice', 2, $array_quote);
				
			//} 

					$array_quote['id_practice']=11;
					$array_quote['quota']=15;
				
					$insert_quote = $this->helper->update('doctor_practice_schedule', 2, $array_quote);
			
			
			
			//$array_practice['id_doctor'] 	= $array_data['id_doctor'];
			//$array_practice['id_doctor'] 	= "22";
			//$array_practice['id_clinic'] 	= "3";
			
			//$array_practice['address_details'] 	= $array_data['address'];
			
			//if ($array_data['isclinic']==1){
			//$array_practice['id_clinic'] 	= $array_data['clinic_id'];
			//$array_practice['address_details'] 	= "";
			//}
			
			//if ($array_data['isclinic']==0){
			
			//$array_practice['id_clinic'] 	= 101;
			
			//$array_practice['address_details'] 	= $array_data['address'];
			//}

			
			//$already_registered =	$this->model->getPractice("",$array_data['id_doctor'], 'id_doctor');
			
			
			
			
				if (!$insert_practice > 0) {
					
					
					echo "Registrado";
					
				}	else{
					
					echo "No Registrado";
				}	
				
				
			}

		function temp ($action, $echoresponse = "Y") {

			switch ($action) {
				case 'save':
					
					$array_data = array();	
			
					foreach ($_POST as $key => $value) {
						if (is_array($_POST)) {
							$array_data['data'][$key] = $value;
						} else{
							$field = escape_value($key);
							$field_data = escape_value($value);	
							$array_data['data'][$field] = $field_data;
						}						
						
					}
					//DB::debugMode();
					$array_data['user_id'] = $array_data['data']['id_doctor'];
					$array_data['role'] = 'doctor'; /*$this->user->getUserdata('role')*/; //'doctor'; //TODO get role with functions;
					$array_data['tempkey'] = $array_data['data']['tempkey'];
					$array_data['url'] = $array_data['data']['url'];				
					
					$previous = Api::getTempRecord("array", $array_data['user_id'], $array_data['tempkey']);
					
					//Delete Previous temp
					if (!empty($previous)) {
						//TODO user un foreach?
						//$array_data['data'] = array_merge(json_decode($previous[0]['data'], TRUE),	$array_data['data']);	




					$data = $previous[0]['data'];
					$data_temp = json_decode($data,true);
						//use as array
						foreach ($data_temp as $key => $value) {
							$array_data['data'][$key] = $value;
						}					
					
						$this->helper->delete('temporal_data', $previous[0]['id']);
					} 
					
					$array_data['data'] = json_encode($array_data['data']);
					
					$insert = $this->helper->insert('temporal_data', $array_data);
					
					if ($insert > 0) {
						$response["tag"] = "temp";
						$response["success"] = 1;
						$response["error"] = 0;	
						$response["response"] = "saved";	
						$response["tempkey"] = $array_data["tempkey"];
					}
					if ($echoresponse == "Y") {
						echo json_encode($response);
					}
					

					break;
				
				default:
					exit;
					break;
			}
		}
	
}
?>