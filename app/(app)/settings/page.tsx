import UpdatePasswordForm from '@/components/form/UpdatePasswordForm'
import PageHeader from '@/components/header/PageHeader'

export default function SettingsPage() {
	return (
		<div>
			<PageHeader title="Settings" description="Manage your account settings." />

			<div className="mt-8">
				<div className="mb-4">
					<h2 className="text-lg font-semibold">Update your password</h2>
					<p className="text-sm text-muted-foreground">
						Choose a new password for your account.
					</p>
				</div>

				<UpdatePasswordForm />
			</div>
		</div>
	)
}