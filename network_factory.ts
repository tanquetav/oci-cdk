import { Construct } from "constructs";
import { IdentityCompartment } from "./.gen/providers/oci/identity-compartment";
import { Network, SmallNetwork } from "./network";

export function NetworkAbstractFactory(
  _scope: Construct,
  _compartment: IdentityCompartment,
  _size: number
): Network {
  if (_size < 5) {
    return new SmallNetwork(_scope, _compartment);
  } else {
    return new SmallNetwork(_scope, _compartment);
  }
}

