const blathersError = new Proxy({"src":"/_astro/Blathers-error.Z0REr3Nq.png","width":307,"height":318,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/David/OneDrive/Desktop/DAW2V_LEAFING_AROUND/Leafing-Around/src/assets/Blathers-error.png";
							}
							
							return target[name];
						}
					});

export { blathersError as b };
