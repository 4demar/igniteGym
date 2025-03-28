
export type HistoricoDTO = {
    id: string;
    name: string;
    group: string;
    hour: string;
    created_at: string;
}

export type HistoricoPorDiaDTO = {
    title: string;
    data: HistoricoDTO[];
}