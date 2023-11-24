import connect from "@/lib/dbConnect"

export default function handler(req: any, res: any) {
  connect()
  
  res.status(200).json({ name: 'John Doe' })
}
