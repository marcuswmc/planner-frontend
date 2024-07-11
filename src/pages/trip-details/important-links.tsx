import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { CreateLinksModal } from "./create-links-modal";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";

type Link = {
    id: string
    title: string
    url: string
}

export function ImportantLinks(){
  
  const { tripId } = useParams()
  const [links, setLinks] = useState<Link[]>([])
  
  useEffect( () => {
    api.get(`/trips/${tripId}/links`).then(response => setLinks(response.data.links))
  }, [tripId])
  
  const [ isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)
  
  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true)
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false)
  }
  return (
    <div className="space-y-6"> 
            <h2 className="font-semibold text-xl">links importantes</h2>            
            <div className="space-y-5">

              {links.map(link => {
                return(
                  <div key={link.id} className="flex items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <span className="block font-medium text-zinc-100">
                        {link.title}
                      </span>
                      <a href="#" className="block  text-xs text-zinc-400 truncate hover:text-zinc-200">
                        {link.url}
                      </a>
                    </div>
                    <Link2 className="text-zinc-400 size-5 shrink-0"/>
                  </div>
                )
              })}

                  

              

              {/* <div className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">Reserva do AirBnB</span>
                  <a href="#" className="block  text-xs text-zinc-400 truncate hover:text-zinc-200">https://www.airbnb.com.br/rooms/1047000111293917429182740121020</a>
                </div>
                <Link2 className="text-zinc-400 size-5 shrink-0"/>
              </div> */}
            </div>

            <Button onClick={openCreateLinkModal} variant="secondary" size="full">
              <Plus className='size-5'/>
              Cadastrar novo link
            </Button>

            { isCreateLinkModalOpen && (
              <CreateLinksModal 
              closeCreateLinkModal={closeCreateLinkModal} />
            )}
    </div>
          

  )
}