import CommissionForm from '@/components/form/CommissionForm';
import PageHeader from '@/components/header/PageHeader';

export default function NewCommissionPage() {
	return (
		<div>
			<PageHeader title="Add Commission" description="Enter the details for this commission." /> 
			<CommissionForm />
		</div>
	);
}