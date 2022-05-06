export interface Data {
	question: string;
	createdBy: any;
	time: number;
	preparationTime: number;
	topic: string;
	image?: string;
	alternatives: Array<{
		title: string;
		description?: string;
		answer: number;
		_id: string
	}>;
	_id: string
}

export interface Props {
	api: Data;
	_id: string;
}