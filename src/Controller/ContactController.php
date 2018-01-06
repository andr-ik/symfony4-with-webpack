<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class ContactController extends Controller
{
    public function indexAction(): Response
    {
        return $this->render('contact/index.html.twig');
    }
}