<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class MainController extends Controller
{
    public function mainAction(): Response
    {
        return $this->render('main/main.html.twig', [
            'name' => 'world',
        ]);
    }
}