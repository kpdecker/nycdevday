# webOS 2.0 Feature Examples
Examples from the content covered in the webOS 2.0 feature summary at the NYC webOS Developer Day 2010.

## Just Type
This example demonstrates the Just Type API as well as an example delegation system for routing the 
just type launches to the proper scene in the current scene stack.

### Key Components
 * appinfo.json : universalSearch entry
    Registers the app with the launcher indicating that it supports just type and what messages the app expects to
    receive when a just type action occurs for the app

 * AppAssistant.handleLaunch
    App entry point. Creates the main stage if one does not exists and routes the just type message if this is a just
    type event.

 * AppAssistant.delegateToSupportingScene
    Delegation logic. This is similar to the StageController.delegateToSceneAssistant logic except that it will delegate
    to any supporting scene on the stack, not just the first scene.

 * MainAssistant.populateStatus
    "Routing only" delegate. Example of a delegate that just pushes the status scene after ensuring the proper stage state.

 * StatusAssistant.populateStatus
    Example delegate that displays the just type message after ensuring the proper scene state. Note that in more complex
    applications this logic will also want to cleanup open controls as well as handle any other conditions that may cause
    an unexpected UI for the user.

### Notes
 * When developing a just type application it is much easier to not remove the application after each code change. If the application is removed it will have to be re-registered with the Just Type infrastructure after each install.
