import { NextResponse } from 'next/server'
import prisma from '@/utils/connect'
import { getAuthSession } from '@/utils/auth'
export const POST = async (req) => {
    const session = await getAuthSession()
    if (!session) {
        return new NextResponse(JSON.stringify({
            message: "Not Authenticated"
        },
            { status: 401 }
            ))
    }
    try {
        console.log()
        const body = await req.json()
        console.log(body)
        const task = await prisma.task.create({
            data: { ...body, userEmail: session.user.email , dateCreated: new Date()  }
        })
        return new NextResponse(JSON.stringify(
            task,
            { status: 200 }
        ))
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({
            message: "Something went wrong!"
        },
            { status: 500 }
        ))
    }
}



export const GET = async (req) => {
    const session = await getAuthSession();
    if (!session) {
      return new NextResponse(
        JSON.stringify({
          message: "Not Authenticated",
        }),
        { status: 401 }
      );
    }
  
    try {
      const tasks = await prisma.task.findMany({
        where: { userEmail: session.user.email },
        orderBy: {
            dateCreated: 'desc', 
        },
      });
  
      return new NextResponse(
        JSON.stringify(tasks),
        { status: 200 }
      );
    } catch (err) {
      console.error(err);
      return new NextResponse(
        JSON.stringify({
          message: "Something went wrong!",
        }),
        { status: 500 }
      );
    }
  };
  
  export const DELETE = async (req) => {
    const session = await getAuthSession();
    const { searchParams } = new URL(req.url)
    
    if (!session) {
      return new NextResponse(JSON.stringify({
        message: "Not Authenticated"
      }, { status: 401 }));
    }
  
    try {

        const taskId = searchParams.get("taskId")
        console.log(taskId)
  
      if (!taskId) {
        return new NextResponse(JSON.stringify({
          message: "Task ID is required for deletion"
        }, { status: 400 }));
      }
  
      const task = await prisma.task.delete({
        where: { id: taskId }
      });
  
      return new NextResponse(JSON.stringify(
        task,
        { status: 200 }
      ));
    } catch (err) {
      console.log(err);
      return new NextResponse(JSON.stringify({
        message: "Something went wrong!"
      }, { status: 500 }));
    }
  };