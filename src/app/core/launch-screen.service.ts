import { Injectable } from "@angular/core";

import { LaunchScreenComponent } from "./launch-screen/launch-screen.component";

@Injectable()
export class LaunchScreenService {
  private launchScreenRef: LaunchScreenComponent | null;

  constructor() {
    this.launchScreenRef = null;
  }

  /**
   * Get launch screen component instance reference.
   */
  getLaunchScreenRef(): LaunchScreenComponent | null {
    return this.launchScreenRef;
  }

  /**
   * Set launch screen component instance reference.
   */
  setLaunchScreenRef(ref: LaunchScreenComponent) {
    if (this.launchScreenRef) {
      throw new Error('Duplicate launch screen component instances are not expected.');

    } else {
      this.launchScreenRef = ref;
    }
  }
}
