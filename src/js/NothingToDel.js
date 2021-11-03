import React from "react";

export function NothingToDel() {
	return (
		<div className="d-flex justify-content-center finalbut">
			<button type="button" className="btn btn-secondary Empty" disabled>
				{" "}
				Nothing To Do!
			</button>
		</div>
	);
}
