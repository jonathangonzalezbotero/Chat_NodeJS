DECLARE
    p_sproces   number := 555551;
    p_qtracker  number := 56380;
BEGIN
    FOR i IN (select distinct c.sseguro,
                              c.nmovimi,
                              c.nmovigen,
                              c.cgenera,
                              s.sproduc,
                              s.npoliza,
                              s.ncertif,
                              c.fefecto,
                              s.fvencim,
                              c.fgenera
                from cesionesrea c, agr_contratos a, seguros s
               where a.scontra =  c.scontra
                 and c.sseguro =  s.sseguro
                 and c.fefecto > c.fvencim
                 and a.cramo   != 101
                 and c.icesion =  0
                 and s.sproduc in (900742, 900745, 900746)
                 and c.fefecto >= to_date('01/12/2019', 'dd/mm/yyyy')
                 and c.nmovimi =  (select max(nmovimi)
                                     from movseguro m
                                    where m.sseguro = c.sseguro)
              ) LOOP

        INSERT INTO genera_cesiones
        VALUES
          (i.sseguro,
           i.nmovimi,
           i.nmovigen,
           i.sproduc,
           i.npoliza,
           i.ncertif,
           p_sproces,
           i.fefecto,
           i.fvencim,
           i.fgenera,
           i.cgenera,
           null,-- este valor se deja generico, no vamos a crear cesiones negativas entonces no se tendra en cuenta
           null,-- valor de nuevo nmovimi, null no aplica
           null,-- valor de nuevo nmovigen, null no aplica
           0,-- indica si el cgenera de suplemento esta erroneo, 0 no 1 si
           0,-- indica si se debe anular la cesion, 0 no 1 si
           1,-- indica si la cesion ncesita ser creada, 0 no 1 si
           0,-- indica si fue procesada la cesion, 0 no 1 si
           p_qtracker,
           'polizas que se crearon con cesion 0 porque tienen fefecto igual a fvencim con ultimo movimiento');

    END LOOP;
    COMMIT;
END;