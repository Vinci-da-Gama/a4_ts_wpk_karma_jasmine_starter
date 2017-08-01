import 'core-js';
import 'zone.js/dist/zone';
import './app/zone-features';
// async,
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// import './app/components/MaskPipeComponent/mask.pipe-spec';
function requireAllSpecs(requireContext: any) {
    requireContext.keys().map(requireContext);
}

requireAllSpecs(require.context('./app', true, /-spec\.ts$/));

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
