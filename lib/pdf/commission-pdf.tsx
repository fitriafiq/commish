import { Commission } from '@/types/commission'
import { Document, Page, Text, View, StyleSheet, renderToBuffer } from '@react-pdf/renderer'

const styles = StyleSheet.create({
	page: {
		padding: 32,
		fontSize: 10
	},
	title: {
		fontSize: 18,
		marginBottom: 20,
		fontWeight: 'bold'
	},
	table: {
		width: '100%',
		borderWidth: 1,
		borderColor: '#ddd'
	},
	row: {
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#ddd'
	},
	header: {
		backgroundColor: '#f5f5f5',
		fontWeight: 'bold'
	},
	cell: {
		padding: 6,
		borderRightWidth: 1,
		borderRightColor: '#ddd'
	},
	index: {
		width: '7%'
	},
	name: {
		width: '23%'
	},
	date: {
		width: '15%'
	},
	price: {
		width: '15%'
	},
	notes: {
		width: '40%'
	},
	totals: {
		marginTop: 16,
		marginLeft: 'auto',
		width: 220
	},
	totalRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingVertical: 5
	},
	totalLabel: {
		fontWeight: 'bold'
	},
	totalValue: {
		textAlign: 'right'
	},
	totalCommission: {
		borderTopWidth: 1,
		borderTopColor: '#ddd',
		marginTop: 4,
		paddingTop: 8
	}
})

function CommissionPdf({ commissions, month }: { commissions: Commission[], month?: string }) {
	const totalAmount = commissions.reduce(
		(total, commission) => total + Number(commission.price),
		0
	)

	const totalCommission = commissions.reduce(
		(total, commission) =>
			total +
			(Number(commission.price) * Number(commission.commissionRate)) / 100,
		0
	)

	const monthLabel = month
		? new Date(`${month}-01`).toLocaleDateString('en-MY', {
			month: 'long',
			year: 'numeric'
		})
		: ''

	return (
		<Document>
			<Page size="A4" style={styles.page}>
				<Text style={styles.title}>
					Commissions {monthLabel && `(${monthLabel})`}
				</Text>

				<View style={styles.table}>
					<View style={[styles.row, styles.header]}>
						<Text style={[styles.cell, styles.index]}>#</Text>
						<Text style={[styles.cell, styles.name]}>Name</Text>
						<Text style={[styles.cell, styles.date]}>Date</Text>
						<Text style={[styles.cell, styles.price]}>Price</Text>
						<Text style={[styles.cell, styles.notes]}>Notes</Text>
					</View>

					{commissions.map((commission, index) => (
						<View style={styles.row} key={commission.id}>
							<Text style={[styles.cell, styles.index]}>
								{index + 1}
							</Text>

							<Text style={[styles.cell, styles.name]}>
								{commission.title}
							</Text>

							<Text style={[styles.cell, styles.date]}>
								{new Date(commission.date).toLocaleDateString('en-MY')}
							</Text>

							<Text style={[styles.cell, styles.price]}>
								RM {Number(commission.price).toFixed(2)}
							</Text>

							<Text style={[styles.cell, styles.notes]}>
								{commission.notes || '-'}
							</Text>
						</View>
					))}
				</View>

				<View style={styles.totals}>
					<View style={styles.totalRow}>
						<Text style={styles.totalLabel}>Total Amount</Text>
						<Text style={styles.totalValue}>
							RM {totalAmount.toFixed(2)}
						</Text>
					</View>

					<View style={[styles.totalRow, styles.totalCommission]}>
						<Text style={styles.totalLabel}>Total Commission</Text>
						<Text style={styles.totalValue}>
							RM {totalCommission.toFixed(2)}
						</Text>
					</View>
				</View>
			</Page>
		</Document>
	)
}

export async function generateCommissionPdf(commissions: Commission[], month?: string) {
	return renderToBuffer(
		<CommissionPdf commissions={commissions} month={month} />
	)
}