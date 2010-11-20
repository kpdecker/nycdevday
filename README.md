# webOS 2.0 Feature Examples
Examples from the content covered in the webOS 2.0 feature summary at the NYC webOS Developer Day 2010.

## Card Groups
This example demonstrates the UI techniques that can be used to allow the user to create multiple stages on demand.

 * Scene cloning
 * Mod+Tap to open in new scene
 * Scene data sharing

### Key Components
 * `ReferenceCountCache`
    Base class used to maintain objects via a reference counter. This wrapped in a manager/factory interface such as the `RandomManager` class allows for instances of data model objects to be shared between multiple scenes (Or other components)
 * `StageManager.stageControllerFromEvent`
    Utility method that determines of a Mod+Tap event has occurred.
 * `StageManager.cloneSceneIntoNewStage`
    Scene cloning API. Recreates the current scene in a new stage by creating a stage and then pushing a new scene with the same name
    and arguments that were passed to the initialization of this scene.
 * `AttributeHandler`
    Example attribute-based action handler.
 * `MainAssistant.attributeTap`
    Attribute and Mod+Tap example.

### Notes
 * The scene clone logic overrides some private framework methods. Anyone who uses this code carefully investigate this functionality on any future webOS releases as this implementation could change at any time.
   * The same effect can be achieved my storing the scene name and scene arguments in the field named `_sceneCloneArgs` on the scene controller. In this situation each scene that wishes to support cloning will need to store this value in their constructor.

## Just Type
This example demonstrates the Just Type API as well as an example delegation system for routing the 
just type launches to the proper scene in the current scene stack.

### Key Components
 * *appinfo.json* : `universalSearch` entry
    Registers the app with the launcher indicating that it supports just type and what messages the app expects to
    receive when a just type action occurs for the app

 * `AppAssistant.handleLaunch`
    App entry point. Creates the main stage if one does not exists and routes the just type message if this is a just
    type event.

 * `AppAssistant.delegateToSupportingScene`
    Delegation logic. This is similar to the `StageController.delegateToSceneAssistant` logic except that it will delegate
    to any supporting scene on the stack, not just the first scene.

 * `MainAssistant.populateStatus`
    "Routing only" delegate. Example of a delegate that just pushes the status scene after ensuring the proper stage state.

 * `StatusAssistant.populateStatus`
    Example delegate that displays the just type message after ensuring the proper scene state. Note that in more complex
    applications this logic will also want to cleanup open controls as well as handle any other conditions that may cause
    an unexpected UI for the user.

### Notes
 * When developing a just type application it is much easier to not remove the application after each code change. If the application is removed it will have to be re-registered with the Just Type infrastructure after each install.

## Exhibition
This example demonstrates the new Exhibition API and some of the possible CSS3 animations that can be run while in exhibition mode.

### Key Components
 * *appinfo.json* : `dockMode` entry
    Registers that app as supporting exhibition mode.

 * `AppAssistant.handleLaunch`
    App entry point. Creates the dock mode stage when requested, using the dockMode flag to determine when this occurs.

 * `FlyinAnimation`
    Utility class that handles the javascript portion of the flyin and flyout animations that are used in this example.
 * *flyin.css*
    CSS side of the flyin and flyout animations.

 * `SlideshowTimer`
    Utility class that handles the refresh interval for the slideshow.

 * `DockAssistant`
    Primary dock scene implementation

### Notes
 * The APIs used in this example are subject to change. The finalized SDK docs should be consulted when released to confirm that there have not been changes to these APIs.
 * Enable/disable commands (novaterm)
  * Start Dock Mode
    > $ luna-send -n 1 palm://com.palm.display/control/setState "{'state': 'dock'}"

  * Stop Dock Mode
    > $ luna-send -n 1 palm://com.palm.display/control/setState "{'state': 'undock'}"
