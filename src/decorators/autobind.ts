//Autobind decorator
export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
	//   console.log('methodName: ', methodName);
	//  console.log('target', target)
	const originalMethod = descriptor.value;
	const adjDescriptor: PropertyDescriptor = {
		configurable: true,
		get() {
			const boundFn = originalMethod.bind(this);
			return boundFn;
		}
	};
	return adjDescriptor;
}
