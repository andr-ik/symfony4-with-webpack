<?php

namespace App\Assets;

use Twig\Extension\AbstractExtension;
use Twig\TwigFunction;

class AssetsExtension extends AbstractExtension
{
    private $assets;

    public function __construct(array $assets = [])
    {
        $this->assets = $assets;
    }

    public function getFunctions()
    {
        return [
            new TwigFunction('registerJs', function (string $component) {
                return $this->registerJs($component);
            }, [
                'is_safe' => ['html']
            ]),
            new TwigFunction('registerCss', function (string $component) {
                return $this->registerCss($component);
            }, [
                'is_safe' => ['html']
            ]),
        ];
    }

    private function registerJs(string $component): string
    {
        $href = $this->extractHref('js', $component);

        return $href ? sprintf('<script src="%s"></script>', $href) : '';
    }

    private function registerCss(string $component): string
    {
        $href = $this->extractHref('css', $component);

        return $href ? sprintf('<link href="%s" rel="stylesheet"/>', $href) : '';
    }

    private function extractHref(string $type, string $component): ?string
    {
        return isset($this->assets[$component]) ? $this->assets[$component][$type] : null;
    }
}