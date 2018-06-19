import {
  ComponentFactoryResolver,
  Injectable,
  Inject
} from '@angular/core'

@Injectable()
export class DynamicFieldService {

  factoryResolver;
  rootViewContainer;
  customComponents = {};

  constructor(@Inject(ComponentFactoryResolver) factoryResolver) {
    this.factoryResolver = factoryResolver
  }
  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }
  addDynamicComponent(DynamicComponent) {
    const factory = this.factoryResolver.resolveComponentFactory(DynamicComponent);
    const component = factory.create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert(component.hostView);
    return component;
  }

  storeCustomComponent(name, DynamicComponent) {
    this.customComponents[name] = DynamicComponent;
  }

  getCustomComponent(name) {
    return this.customComponents[name] || null;
  }
}
