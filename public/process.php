<?php
    $errors = array(); //To store errors
    $form_data = array(); //Pass back the data 


    /*Reg form fields validation
    ///////////////////////////////
    if (empty($_POST['email'])) { 
        $errors['email'] = true;
    }
    */

    // Auth form fields validation
    ///////////////////////////////
    if (empty($_POST['email'])) { 
        $errors['text'] = true;
    }

    if (empty($_POST['password'])) { 
        $errors['text'] = true;
    }
    

    /* Step1 fields validation
    ///////////////////////////////    
    if (empty($_POST['section'])) { 
        $errors['text'] .= '- Введите название секции.<br />';
    }

    if (empty($_POST['team_name'])) { 
        $errors['text'] .= '- Введите название команды.<br />';
    }    

    if (empty($_POST['proj_name'])) { 
        $errors['text'] .= '- Введите название проекта.<br />';
    }

    if (empty($_POST['proj_descr'])) { 
        $errors['text'] .= '- Введите описание проекта.<br />';
    }  
    */

    /* Step2 fields validation
    ///////////////////////////////    
    if (empty($_POST['name'])) { 
        $errors['text'] .= '- Укажите ФИО.<br />';
    }

    if (empty($_POST['email'])) { 
        $errors['text'] .= '- Укажите E-mail.<br />';
    }

    if (empty($_POST['phone'])) { 
        $errors['text'] .= '- Укажите номер телефона.<br />';
    }

    if (empty($_POST['school'])) { 
        $errors['text'] .= '- Укажите учебное заведение.<br />';
    }

    if (empty($_POST['country'])) { 
        $errors['text'] .= '- Укажите страну.<br />';
    }

    if (empty($_POST['city'])) { 
        $errors['text'] .= '- Укажите город.<br />';
    }            
    */

    if (!empty($errors)) { //If errors in validation
        $form_data['success'] = false;
        $form_data['errors']  = $errors;
    } else { //If not, process the form, and return true on success
        $form_data['success'] = true;
        $form_data['posted'] = 'Data Was Posted Successfully';
    }

    //Return the data back 
    echo json_encode($form_data);
