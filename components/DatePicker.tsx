'use client'

import { format } from 'date-fns'
import { Button } from './ui/button'
import { Calendar } from './ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from './ui/popover'
import { ChevronDownIcon } from 'lucide-react'

export function DatePicker({ value, onChange }: { value?: Date; onChange: (date: Date | undefined) => void }) {
	return (
		<Popover>
			<PopoverTrigger
				render={
					<Button
						variant="outline"
						data-empty={!value}
						className="w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground"
					>
						{value ? format(value, 'PPP') : <span>Pick a date</span>}
						<ChevronDownIcon data-icon="inline-end" />
					</Button>
				}
			/>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={value}
					onSelect={onChange}
					defaultMonth={value}
				/>
			</PopoverContent>
		</Popover>
	)
}